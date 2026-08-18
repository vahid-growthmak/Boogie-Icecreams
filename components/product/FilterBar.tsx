'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import { cn } from '@/lib/cn';
import { CATEGORIES, CATEGORY_LABELS, SORTS, SORT_LABELS, type Category, type Sort } from '@/lib/schema';

/**
 * Filter state lives in the URL, never in client state. This component only
 * rewrites searchParams; the server re-renders the grid. That is what makes a
 * filtered URL shareable and keeps the first paint unfiltered-flash-free.
 */
export function FilterBar({
  activeCategory,
  activeSort,
  total,
}: {
  activeCategory?: Category;
  activeSort: Sort;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function apply(next: { category?: Category | null; sort?: Sort }) {
    const query = new URLSearchParams(params.toString());

    if (next.category === null) query.delete('category');
    else if (next.category) query.set('category', next.category);

    if (next.sort) query.set('sort', next.sort);

    // Any filter change resets pagination — page 3 of a different filter is a lie.
    query.delete('page');

    const qs = query.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  const chip = (active: boolean) =>
    cn(
      'eyebrow rounded-none border px-5 py-2.5 transition-colors',
      active
        ? 'border-mulberry bg-mulberry text-paper'
        : 'border-cocoa/25 text-cocoa hover:border-mulberry hover:text-mulberry',
    );

  return (
    <div className="sticky top-[72px] z-30 border-y border-cocoa/15 bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-(--container-site) flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div
          className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:px-0"
          role="group"
          aria-label="Filter by category"
        >
          <button
            type="button"
            aria-pressed={!activeCategory}
            onClick={() => apply({ category: null })}
            className={chip(!activeCategory)}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => apply({ category })}
              className={chip(activeCategory === category)}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="eyebrow text-cocoa-60">
            Sort
          </label>
          <select
            id="sort"
            value={activeSort}
            onChange={(e) => apply({ sort: e.target.value as Sort })}
            className="rounded-none border border-cocoa/25 bg-transparent px-4 py-2.5 text-body text-cocoa"
          >
            {SORTS.map((sort) => (
              <option key={sort} value={sort}>
                {SORT_LABELS[sort]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* One polite region announces the result count for every filter change. */}
      <p aria-live="polite" className="sr-only">
        {pending ? 'Updating results' : `${total} ${total === 1 ? 'flavour' : 'flavours'}`}
      </p>
    </div>
  );
}
