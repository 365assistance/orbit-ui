// ---------------------------------------------------------------------------
// DateTimePicker — portal-styled datetime picker (replaces the native
// <input type="datetime-local">, whose OS/browser calendar popup is bright
// blue and does not match the portal's purple/rounded design language).
//
// - Trigger: a rounded, tokenised field showing the selected date + time (or a
//   placeholder), with a calendar icon.
// - Popover (Radix, same primitive family as Dialog/Select): a month calendar
//   grid + hour/minute/meridiem selects, all built from design tokens.
//
// Value contract: matches the native input it replaces — a string in
// `YYYY-MM-DDTHH:mm` (datetime-local) format, or '' when nothing is selected.
// Downstream code (sendAt / scheduledFor) is unchanged.
// ---------------------------------------------------------------------------

import * as React from 'react';
import { Popover as PopoverPrimitive } from 'radix-ui';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

// ---- value <-> parts helpers ----------------------------------------------

type Parts = { year: number; month: number; day: number; hour: number; minute: number };

function parseValue(v: string): Parts | null {
  // Expect YYYY-MM-DDTHH:mm (seconds optional).
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(v || '');
  if (!m) return null;
  return {
    year: Number(m[1]),
    month: Number(m[2]) - 1, // 0-indexed
    day: Number(m[3]),
    hour: Number(m[4]),
    minute: Number(m[5]),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

function toValue(p: Parts): string {
  return `${p.year}-${pad(p.month + 1)}-${pad(p.day)}T${pad(p.hour)}:${pad(p.minute)}`;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; // Monday-first, matches the portal reference

function formatDisplay(p: Parts): string {
  const h12 = p.hour % 12 === 0 ? 12 : p.hour % 12;
  const mer = p.hour < 12 ? 'am' : 'pm';
  return `${pad(p.day)}/${pad(p.month + 1)}/${p.year}, ${pad(h12)}:${pad(p.minute)} ${mer}`;
}

// Date-only display (no time), used when the picker is in dateOnly mode.
function formatDisplayDate(p: Parts): string {
  return `${pad(p.day)}/${pad(p.month + 1)}/${p.year}`;
}

// Days in a month, and the Monday-first weekday index (0=Mon) of the 1st.
function monthGrid(year: number, month: number): (number | null)[] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const jsDow = first.getDay(); // 0=Sun..6=Sat
  const lead = (jsDow + 6) % 7; // convert to Monday-first (0=Mon)
  const cells: (number | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

// ---- component ------------------------------------------------------------

export interface DateTimePickerProps {
  value: string; // YYYY-MM-DDTHH:mm or ''
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: Date; // disable days before this (defaults to today)
  ariaLabel?: string;
  maxWidth?: number;
  // Date-only mode: hide the time column and show only the date. The value is
  // still emitted as YYYY-MM-DDTHH:mm (time pinned to 00:00) so callers can
  // slice(0,10) for a plain date. Used by date-only fields (e.g. promo dates).
  dateOnly?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = 'Select date and time',
  minDate,
  ariaLabel = 'Select date and time',
  maxWidth = 300,
  dateOnly = false,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const parsed = parseValue(value);

  // The month currently shown in the calendar; defaults to the selected month
  // or the current month.
  const now = new Date();
  const [viewYear, setViewYear] = React.useState(parsed?.year ?? now.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(parsed?.month ?? now.getMonth());

  // Keep the view in sync when the value changes externally.
  React.useEffect(() => {
    const p = parseValue(value);
    if (p) { setViewYear(p.year); setViewMonth(p.month); }
  }, [value]);

  const min = minDate ?? new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Current parts (fall back to a sensible default when nothing is selected).
  const cur: Parts = parsed ?? {
    year: now.getFullYear(), month: now.getMonth(), day: now.getDate(),
    hour: 9, minute: 0,
  };

  const commit = (next: Partial<Parts>) => {
    onChange(toValue({ ...cur, ...next }));
  };

  const selectDay = (day: number) => {
    // If nothing was selected yet, default the time to 09:00.
    commit({ year: viewYear, month: viewMonth, day });
  };

  const isSelected = (day: number) =>
    !!parsed && parsed.year === viewYear && parsed.month === viewMonth && parsed.day === day;

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < new Date(min.getFullYear(), min.getMonth(), min.getDate());
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const cells = monthGrid(viewYear, viewMonth);
  const h12 = cur.hour % 12 === 0 ? 12 : cur.hour % 12;
  const meridiem = cur.hour < 12 ? 'am' : 'pm';

  const setHour12 = (h: number) => {
    const isPm = meridiem === 'pm';
    let hour24 = h % 12;
    if (isPm) hour24 += 12;
    commit({ hour: hour24 });
  };
  const setMeridiem = (mer: 'am' | 'pm') => {
    let hour24 = cur.hour % 12;
    if (mer === 'pm') hour24 += 12;
    commit({ hour: hour24 });
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
            maxWidth, width: '100%', height: 38,
            background: 'var(--card)',
            border: `1px solid ${open ? 'var(--primary)' : 'var(--border-default)'}`,
            borderRadius: 'var(--radius)',
            padding: '6px 12px',
            fontSize: 13, fontWeight: 500,
            color: parsed ? 'var(--ink-primary)' : 'var(--ink-muted)',
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer', outline: 'none',
            transition: 'border-color .12s ease',
          }}
        >
          <span>{parsed ? (dateOnly ? formatDisplayDate(parsed) : formatDisplay(parsed)) : placeholder}</span>
          <Calendar className="h-4 w-4" style={{ color: 'var(--ink-muted)', flexShrink: 0 }} aria-hidden />
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={6}
          style={{
            zIndex: 60,
            background: 'var(--card)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            padding: 14,
            display: 'flex', gap: 16,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {/* Calendar */}
          <div style={{ minWidth: 234 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-primary)' }}>
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button type="button" aria-label="Previous month" onClick={prevMonth} style={navBtn}>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button type="button" aria-label="Next month" onClick={nextMonth} style={navBtn}>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
              {WEEKDAYS.map((w, i) => (
                <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', padding: '2px 0' }}>{w}</div>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <div key={i} />;
                const selected = isSelected(day);
                const disabled = isDisabled(day);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={disabled}
                    onClick={() => selectDay(day)}
                    style={{
                      height: 30, width: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      fontSize: 13, fontWeight: selected ? 700 : 500,
                      background: selected ? 'var(--primary)' : 'transparent',
                      color: selected ? '#fff' : disabled ? 'var(--ink-faint)' : 'var(--ink-primary)',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      opacity: disabled ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => { if (!selected && !disabled) e.currentTarget.style.background = 'var(--surface-alt)'; }}
                    onMouseLeave={(e) => { if (!selected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <button type="button" onClick={() => onChange('')} style={linkBtn}>Clear</button>
              <button
                type="button"
                onClick={() => {
                  const t = new Date();
                  setViewYear(t.getFullYear()); setViewMonth(t.getMonth());
                  commit({ year: t.getFullYear(), month: t.getMonth(), day: t.getDate() });
                }}
                style={linkBtn}
              >
                Today
              </button>
            </div>
          </div>

          {/* Time (hidden in date-only mode) */}
          {!dateOnly && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderLeft: '1px solid var(--border-subtle)', paddingLeft: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: 0.4 }}>Time</span>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <TimeSelect
                ariaLabel="Hour"
                value={h12}
                options={Array.from({ length: 12 }, (_, i) => i + 1)}
                format={(n) => pad(n)}
                onChange={setHour12}
              />
              <span style={{ fontWeight: 700, color: 'var(--ink-muted)', lineHeight: '34px' }}>:</span>
              <TimeSelect
                ariaLabel="Minute"
                value={cur.minute}
                options={Array.from({ length: 60 }, (_, i) => i)}
                format={(n) => pad(n)}
                onChange={(minute) => commit({ minute })}
              />
              {/* AM/PM column — selected pinned to top like the hour/minute columns. */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 48 }}>
                {([meridiem, meridiem === 'am' ? 'pm' : 'am'] as const).map((mer) => {
                  const sel = meridiem === mer;
                  return (
                    <button
                      key={mer}
                      type="button"
                      onClick={() => setMeridiem(mer)}
                      style={{
                        height: 34, width: '100%',
                        borderRadius: 'var(--radius-sm)',
                        border: sel ? '1px solid var(--primary)' : '1px solid var(--border-default)',
                        outline: sel ? '2px solid var(--primary-ring, rgba(146,36,142,.30))' : 'none',
                        outlineOffset: sel ? 1 : 0,
                        background: sel ? 'var(--primary)' : 'var(--card)',
                        color: sel ? '#fff' : 'var(--ink-primary)',
                        fontSize: 13, fontWeight: 700, cursor: 'pointer',
                      }}
                    >
                      {mer}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

// A compact time column (hours/minutes) styled to the portal.
//
// Reference behaviour (Sofia 2026-08-14): the SELECTED value is PINNED to the
// TOP of the column, with the remaining values listed downward in natural order
// (wrapping past the end). This matches all three columns uniformly, instead of
// centering the selection like a scroll wheel. The selected chip is full-width
// with a purple background + focus ring.
function TimeSelect({
  value, options, format, onChange, ariaLabel,
}: {
  value: number;
  options: number[];
  format: (n: number) => string;
  onChange: (n: number) => void;
  ariaLabel: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Reorder so the selected value is first (top-pinned), then the rest in order
  // wrapping around. e.g. options 1..12, value 9 -> [9,10,11,12,1,2,...,8].
  const idx = Math.max(0, options.indexOf(value));
  const ordered = [...options.slice(idx), ...options.slice(0, idx)];

  // Keep the list scrolled to the top so the pinned selection is always visible.
  React.useEffect(() => {
    if (ref.current) ref.current.scrollTop = 0;
  }, [value]);

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label={ariaLabel}
      style={{
        height: 174, width: 48, overflowY: 'auto', padding: 2,
        border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)',
        display: 'flex', flexDirection: 'column', gap: 2,
        scrollbarWidth: 'thin',
      }}
    >
      {ordered.map((n) => {
        const sel = n === value;
        return (
          <button
            key={n}
            type="button"
            role="option"
            aria-selected={sel}
            onClick={() => onChange(n)}
            style={{
              height: 34, width: '100%', flexShrink: 0,
              border: sel ? '1px solid var(--primary)' : 'none',
              outline: sel ? '2px solid var(--primary-ring, rgba(146,36,142,.30))' : 'none',
              outlineOffset: sel ? 1 : 0,
              borderRadius: 'var(--radius-sm)', textAlign: 'center',
              background: sel ? 'var(--primary)' : 'transparent',
              color: sel ? '#fff' : 'var(--ink-primary)',
              fontSize: 13, fontWeight: sel ? 700 : 500, cursor: 'pointer',
            }}
            onMouseEnter={(e) => { if (!sel) e.currentTarget.style.background = 'var(--surface-alt)'; }}
            onMouseLeave={(e) => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
          >
            {format(n)}
          </button>
        );
      })}
    </div>
  );
}

const navBtn: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  height: 28, width: 28, borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)', background: 'var(--card)',
  color: 'var(--ink-mid)', cursor: 'pointer',
};

const linkBtn: React.CSSProperties = {
  background: 'none', border: 'none', color: 'var(--primary)',
  fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0,
};

export default DateTimePicker;
