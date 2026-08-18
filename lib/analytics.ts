'use client';

/**
 * GA4 ecommerce events, PRD §8. A thin wrapper so components never touch
 * `window.gtag` directly and the whole thing no-ops when GA is not configured
 * (local dev, previews, or a visitor who blocked it).
 */

type GtagWindow = Window & {
  gtag?: (command: 'event', name: string, params: Record<string, unknown>) => void;
};

export type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  /** Rupees, not paise — GA4 expects a currency amount. */
  price: number;
  quantity?: number;
};

type EventName =
  | 'view_item_list'
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'trade_enquiry_submit';

export function track(name: EventName, params: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as GtagWindow).gtag;
  if (!gtag) return;
  gtag('event', name, { currency: 'INR', ...params });
}

/** paise → rupees, for analytics payloads only. Display goes through lib/format. */
export function toValue(paise: number): number {
  return paise / 100;
}
