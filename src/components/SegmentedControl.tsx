// ---------------------------------------------------------------------------
// SegmentedControl — the single, portal-wide segmented toggle / tab pattern.
//
// Flow Sharp "Fix B" treatment: a recessed grey track sits clearly on the light
// page surface; the selected option lifts as a white pill with purple text.
// Inactive options are muted grey and darken on hover.
//
// Use this everywhere a small in-page toggle or tab bar is needed (Single Send
// channel/units toggle, client config tabs, audience view, etc.) instead of
// hand-rolling inline styles — that inline drift is what made toggles vanish on
// the new grey background.
// ---------------------------------------------------------------------------

import type { CSSProperties, ReactNode } from 'react';

export interface SegmentOption<T extends string> {
  value: T;
  label: ReactNode;
  /** optional aria-label / title when the label is a symbol (e.g. "#", "%") */
  srLabel?: string;
}

export interface SegmentedControlProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentOption<T>[];
  /** compact = symbol toggles (#/%); default = text tabs */
  size?: 'sm' | 'md';
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export function SegmentedControl<T extends string>({
  value, onChange, options, size = 'md', ariaLabel, className, style,
}: SegmentedControlProps<T>) {
  const pad = size === 'sm' ? '6px 14px' : '6px 16px';
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={className}
      style={{
        display: 'inline-flex',
        // #EAECEF/#E0E3E8 kept literal for now: the recessed-track greys sit
        // one notch cooler than --surface-alt (#F0F2F8). Phase 3 will formalise
        // them (e.g. --surface-alt2 / --track). Radius now on the token.
        background: '#EAECEF',              // recessed track — reads against #f8f9fb surface
        border: '1px solid #E0E3E8',
        borderRadius: 'var(--radius-pill)',
        padding: 3,
        gap: 2,
        ...style,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={opt.srLabel}
            title={opt.srLabel}
            onClick={() => onChange(opt.value)}
            style={{
              padding: pad,
              minWidth: size === 'sm' ? 34 : undefined,
              borderRadius: 'var(--radius-pill)',
              fontSize: 12,
              fontWeight: active ? 700 : 600,
              cursor: 'pointer',
              border: 'none',
              background: active ? '#fff' : 'transparent',
              color: active ? 'var(--primary)' : 'var(--ink-mid)',
              boxShadow: active ? '0 1px 3px rgba(16,24,40,.14)' : 'none',
              fontFamily: 'var(--font-sans)',
              transition: 'all .15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'var(--ink-primary)'; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--ink-mid)'; }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
