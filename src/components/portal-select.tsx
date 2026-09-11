// ---------------------------------------------------------------------------
// PortalSelect — the portal's custom dropdown (button + portalled, fully-styled
// light option list), matching the audience builder's Select. Use this instead
// of a raw native <select> when the OPEN option list needs to be on-brand (a
// native <select>'s open list is OS-styled and renders dark in dark mode).
//
// Self-contained: options are {value,label}; portals the menu to <body> so it
// escapes overflow/stacking contexts and positions against the trigger.
// ---------------------------------------------------------------------------
import { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

export interface PortalSelectOption {
  value: string;
  label: string;
}

export interface PortalSelectProps {
  value: string;
  options: PortalSelectOption[];
  onChange: (v: string) => void;
  'aria-label'?: string;
  minWidth?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}

export function PortalSelect({ value, options, onChange, minWidth = 200, disabled = false, fullWidth = false, placeholder, ...rest }: PortalSelectProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<{ left: number; top: number; width: number } | null>(null);

  useLayoutEffect(() => {
    if (!open || !btnRef.current) return;
    const update = () => {
      const r = btnRef.current!.getBoundingClientRect();
      setRect({ left: r.left, top: r.bottom + 4, width: r.width });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  const current = options.find((o) => o.value === value);

  return (
    <div style={{ position: 'relative' }}>
      <button
        ref={btnRef}
        type="button"
        aria-label={rest['aria-label']}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        style={{
          minWidth: fullWidth ? undefined : minWidth,
          width: fullWidth ? '100%' : undefined,
          opacity: disabled ? 0.6 : 1,
          pointerEvents: disabled ? 'none' : undefined,
          height: 38,
          borderRadius: 'var(--radius)',
          border: `1px solid ${open ? 'var(--primary)' : 'var(--border-default)'}`,
          background: 'var(--card)',
          padding: '6px 12px',
          fontSize: 13,
          fontWeight: 500,
          fontFamily: 'var(--font-sans)',
          color: 'var(--ink-primary)',
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: current ? 'var(--ink-primary)' : 'var(--ink-muted)' }}>{current?.label ?? placeholder ?? ''}</span>
        <ChevronDown
          className="h-4 w-4"
          style={{ color: 'var(--ink-muted)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}
        />
      </button>
      {open && rect && createPortal(
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000 }} />
          <div
            role="listbox"
            style={{
              position: 'fixed',
              left: rect.left,
              top: rect.top,
              minWidth: rect.width,
              width: 'max-content',
              maxWidth: 360,
              background: '#fff',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)',
              zIndex: 1001,
              maxHeight: 280,
              overflowY: 'auto',
              padding: 4,
            }}
          >
            {options.map((o) => {
              const isSel = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={isSel}
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius)',
                    border: 'none',
                    background: isSel ? 'var(--accent)' : 'transparent',
                    color: 'var(--ink-primary)',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontFamily: 'var(--font-sans)',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </>,
        document.body,
      )}
    </div>
  );
}
