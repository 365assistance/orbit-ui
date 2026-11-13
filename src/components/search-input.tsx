import { Search as SearchIcon, X } from 'lucide-react';

/**
 * SearchInput — the ONE shared search field across Orbit (admin lists, pickers,
 * modals: clients, members, tenants, permissions, etc.).
 *
 * Standardised 2026-11-11 (Sofia): one style everywhere so search stops drifting
 * per-screen with different border radii. White fill, defined border, a leading
 * magnifier, moderate rounded corners (8px, matching other Orbit controls), a
 * purple focus ring, and an optional clear button. Use this everywhere search
 * appears — do not hand-roll a search input.
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
          borderRadius: 8,
          border: '1px solid #D8DEE6',
          background: '#fff',
          padding: '0 38px 0 38px',
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          color: '#242D38',
          outline: 'none',
          transition: 'border-color .15s, box-shadow .15s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#92248E';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(146,36,142,.20)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = '#D8DEE6';
          e.currentTarget.style.boxShadow = 'none';
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
