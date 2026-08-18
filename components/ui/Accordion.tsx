'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';

import { Chevron } from './icons';

/**
 * Radix Accordion, styled by us. Headers are buttons inside a real heading, so
 * the PDP's Ingredients / Allergens / Nutrition / Storage block keeps its
 * document outline. Allergens open by default when the product declares one —
 * the caller controls that through defaultValue.
 */

export function Accordion({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue?: string[];
}) {
  return (
    <RadixAccordion.Root
      type="multiple"
      defaultValue={defaultValue}
      className="border-t border-cocoa/15"
    >
      {children}
    </RadixAccordion.Root>
  );
}

export function AccordionItem({
  value,
  title,
  children,
  emphasis = false,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
  /** Allergens get visual weight as well as an open default. */
  emphasis?: boolean;
}) {
  return (
    <RadixAccordion.Item value={value} className="border-b border-cocoa/15">
      <RadixAccordion.Header asChild>
        <h3 className="m-0">
          <RadixAccordion.Trigger
            className="group flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span
              className={
                emphasis
                  ? 'eyebrow text-mulberry'
                  : 'eyebrow text-cocoa'
              }
            >
              {title}
            </span>
            <Chevron className="size-5 shrink-0 text-cocoa-60 transition-transform group-data-[state=open]:rotate-180" />
          </RadixAccordion.Trigger>
        </h3>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="overflow-hidden">
        <div className="pb-6 text-body text-cocoa">{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}
