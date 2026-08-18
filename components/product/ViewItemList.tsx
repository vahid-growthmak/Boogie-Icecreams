'use client';

import { useEffect } from 'react';

import { track } from '@/lib/analytics';

/**
 * Fires view_item_list when /products renders. Renders nothing — analytics needs
 * a client effect, and this keeps that out of the page component.
 */
export function ViewItemList({
  listName,
  items,
}: {
  listName: string;
  items: Array<{ id: string; name: string; category: string }>;
}) {
  const signature = `${listName}:${items.map((i) => i.id).join(',')}`;

  useEffect(() => {
    track('view_item_list', {
      item_list_name: listName,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        index,
      })),
    });
    // Re-fires when the filtered list actually changes, not on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return null;
}
