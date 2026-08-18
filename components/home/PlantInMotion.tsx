import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
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
    <section className="bg-sand/50">
      <Container className="section-y">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="index-num">The plant</p>
            <h2 className="mt-5 text-h2">Come and look at it</h2>
            <p className="mt-7 text-body-lead text-cocoa">
              Every manufacturer in this category says the same things about quality. The only
              difference worth anything is whether you are allowed through the door.
            </p>

            <dl className="mt-10 divide-y divide-cocoa/15 border-y border-cocoa/15">
              {SPEC.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="eyebrow text-cocoa-60">{row.label}</dt>
                  <dd className="text-body text-cocoa">{row.value}</dd>
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
              <div className="relative aspect-video">
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
                {/* Deliberately an empty frame, not a fake one. */}
                <div className="flex aspect-video items-center justify-center border border-cocoa/20 bg-paper/70">
                  <Play className="size-12 text-cocoa/25" />
                </div>
                <p className="figcaption mt-4">
                  Reserved for the filmed plant tour. No stock or generated footage stands in for
                  the facility — several of the Google reviews above were written by people who had
                  just been walked round it, and they would notice.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
