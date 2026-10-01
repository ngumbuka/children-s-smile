import { useCallback, useRef, type ReactNode } from 'react';

export type TabItem = { value: string; label: string; icon?: ReactNode };

type AnyTabItem = Readonly<TabItem>;

type TabBarProps = {
  /** Accessible name for the tab list. */
  label: string;
  items: readonly AnyTabItem[];
  value: string;
  onChange: (value: string) => void;
  /**
   * Visual variant. `pill` is the dark-blue active chip used on the news grid,
   * `outline` is the white active chip used on the project catalogue.
   */
  variant?: 'pill' | 'outline';
  className?: string;
  /** Extra node rendered after the tabs (e.g. a region selector). */
  trailing?: ReactNode;
  /** id of the panel the tabs control, for `aria-controls`. */
  panelId?: string;
};

export function TabBar({
  label,
  items,
  value,
  onChange,
  variant = 'pill',
  className = '',
  trailing,
  panelId,
}: TabBarProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = useCallback((index: number) => {
    const tabs = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    if (!tabs?.length) return;
    const next = (index + tabs.length) % tabs.length;
    tabs[next]?.focus();
    tabs[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, []);

  const active = items.find((item) => item.value === value) ?? items[0];

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 w-full min-w-0 ${className}`}>
      <div
        ref={listRef}
        aria-label={label}
        className="flex flex-wrap items-center gap-2 min-w-0"
        onKeyDown={(event) => {
          const index = items.findIndex((item) => item.value === value)
          switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
              event.preventDefault()
              focusTab(index + 1)
              break
            case 'ArrowLeft':
            case 'ArrowUp':
              event.preventDefault()
              focusTab(index - 1)
              break
            case 'Home':
              event.preventDefault()
              focusTab(0)
              break
            case 'End':
              event.preventDefault()
              focusTab(items.length - 1)
              break
            default:
          }
        }}
        role="tablist"
      >
        {items.map((item) => {
          const selected = item.value === value
          return (
            <button
              key={item.value}
              type="button"
              aria-controls={panelId}
              aria-selected={selected}
              className={[
                'flex items-center gap-2 rounded-pill min-h-11 px-5 py-2 text-sm leading-5 font-["Inter:Semi_Bold"] font-semibold transition-colors',
                'transition-colors duration-150 cursor-pointer whitespace-nowrap',
                'shrink-0 max-w-full',
                variant === 'pill'
                  ? selected
                    ? 'bg-brand-900 text-white drop-shadow-card'
                    : 'bg-surface-tint text-ink-700 hover:bg-[#dde1ff]'
                  : selected
                    ? 'bg-brand-700 text-white drop-shadow-card'
                    : 'bg-white text-ink-700 hover:bg-surface-muted border border-surface-tint',
              ].join(' ')}
              data-filter={item.value}
              onClick={() => onChange(item.value)}
              role="tab"
              tabIndex={selected ? 0 : -1}
            >
              {item.icon ? (
                <span className="flex shrink-0 items-center justify-center [&>svg]:block">
                  {item.icon}
                </span>
              ) : null}
              <span className="leading-5 whitespace-nowrap">{item.label}</span>
            </button>
          )
        })}
      </div>
      {trailing}
      <span aria-live="polite" className="sr-only">
        {`${active?.label ?? ''} sélectionné`}
      </span>
    </div>
  )
}
