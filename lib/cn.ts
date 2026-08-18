/**
 * Minimal class joiner. Deliberately not `clsx` + `tailwind-merge` — two
 * dependencies for something eleven lines long, against a 130KB budget.
 * Conflicting classes are a component bug, not something to merge away.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
