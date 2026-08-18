import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { DripEdge } from '@/components/ui/DripEdge';
import { Play } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { PLANT } from '@/lib/site';

/**
 * Sitemap §1.6 — "The plant, in motion".
 *
 * "Converts an unverifiable quality claim into a verifiable invitation.
 * Video-led because the process is inherently visual and text has never carried
 * it." Note: "Filmed plant tour. Real footage of the actual facility and staff."
 *
 * No such footage exists yet, and nothing stock or generated stands in for it —
 * this is the one section a visiting distributor can personally falsify, so a
 * dressed-up stand-in would cost more than an empty frame does. What fills the
 * space instead is the checkable detail: where it is, what it is classified as,
 * when it is open. Facts, not a photograph of somebody else's factory.
 *
 * The player replaces the frame the moment PLANT.tourVideo is set.
 */

const SPEC = [
  { label: 'Location', value: PLANT.place },
  { label: 'State', value: PLANT.state },
  { label: 'Classified as', value: 'Manufacturer' },
  { label: 'Hours', value: PLANT.hours },
];

export function PlantInMotion() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <Container className="section-y">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <span className="chip bg-tint-4 text-brand-brown">The plant</span>
            <h2 className="mt-6 font-round text-h2">Come and look at it</h2>
            <p className="mt-6 text-body-lead text-brand-brown-soft">
              Every manufacturer in this category says the same things about quality. The only
              difference worth anything is whether you are allowed through the door.
            </p>

            <dl className="mt-10 flex flex-col gap-2">
              {SPEC.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6 rounded-[1.25rem] bg-tint-3 px-5 py-3.5">
                  <dt className="font-round text-caption text-brand-brown-soft">{row.label}</dt>
                  <dd className="font-round text-body text-brand-brown">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/plant/visit">Book a plant visit</ButtonLink>
              <ButtonLink href="/plant" variant="link">
                What we make it on →
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delayIndex={1}>
            {PLANT.tourVideo ? (
              <div className="relative aspect-video overflow-hidden rounded-card">
                <video
                  src={PLANT.tourVideo}
                  controls
                  playsInline
                  preload="none"
                  className="size-full object-cover"
                />
              </div>
            ) : (
              <>
                <div className="relative aspect-video overflow-hidden rounded-card bg-tint-1">
                  <Image
                    src="/images/stock/plant-line.webp"
                    alt="Chilled dairy production on stainless racks — illustrative, not the Boogies plant"
                    fill
                    sizes="(min-width:1024px) 58vw, 92vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-chip bg-cream/90 px-4 py-2 text-caption text-brand-brown">
                    <Play className="size-4" />
                    Filmed tour coming
                  </span>
                </div>
                {/* The caption is load-bearing, not decoration. This section
                    invites a distributor to visit Kannamangalam, so the one
                    thing the page must not do is let a stock frame pass as the
                    facility. Deleting this line turns an illustration into a
                    false claim about a real place. */}
                <p className="figcaption mt-4">
                  Stock image, not the Boogies plant. The filmed tour is shot on site — several of
                  the Google reviews above were written by people who had just been walked round
                  the real facility.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Container>
      <DripEdge className="text-tint-5" />
    </section>
  );
}
