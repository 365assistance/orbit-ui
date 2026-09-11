import { Search as SearchIcon, X } from 'lucide-react';

/**
 * SearchInput — shared search field for admin lists (clients, members, etc.).
 *
 * The base Orbit Input is bg-transparent with a light border, which disappears
 * on grey page backgrounds. This wraps it in a clearly-visible affordance:
 * white fill, defined border, a leading magnifier, and an optional clear button.
 * Tokenised so it stays on-system. Use everywhere search appears so it doesn't
 * drift per-screen.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Search',
  ariaLabel,
  width = 320,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  /** Max width in px; pass 0 for full width. */
  width?: number;
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: width || undefined,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <SearchIcon
        className="h-4 w-4"
        aria-hidden
        style={{ position: 'absolute', left: 12, color: '#92248E', pointerEvents: 'none' }}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        style={{
          width: '100%',
          height: 40,
          borderRadius: 9999,
          border: '1.5px solid #D8DEE6',
          background: '#fff',
          padding: '0 38px 0 38px',
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          color: '#242D38',
          outline: 'none',
          boxShadow: '0 1px 2px rgba(0,0,0,.04)',
          transition: 'border-color .15s, box-shadow .15s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#92248E';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(146,36,142,.15)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#D8DEE6';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,.04)';
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: 'none',
            background: '#F0F2F8',
            color: '#707885',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
