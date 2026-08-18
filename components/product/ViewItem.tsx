'use client';

import { useEffect } from 'react';

import { track, toValue } from '@/lib/analytics';

/** Fires view_item on PDP render. Renders nothing. */
export function ViewItem({
  item,
}: {
  item: { id: string; name: string; category: string; price: number };
}) {
  useEffect(() => {
    track('view_item', {
      value: toValue(item.price),
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: toValue(item.price),
        },
      ],
    });
  }, [item.id, item.name, item.category, item.price]);

  return null;
}
