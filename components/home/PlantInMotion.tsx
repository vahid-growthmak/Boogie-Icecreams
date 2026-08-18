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
 * it." The note is specific: "Filmed plant tour. Real footage of the actual
 * facility and staff."
 *
 * No such footage has been supplied. Rather than dress a stock clip or a
 * generated still as the facility — which would break the same rule §1.2 sets
 * for the hero, and would be caught by any visitor who then books a visit — the
 * section ships as the invitation without the film. The player appears the
 * moment PLANT.tourVideo is set; nothing else needs to change.
 */
export function PlantInMotion() {
  return (
    <section className="bg-sand/50">
      <Container className="section-y">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-cocoa-60">The plant</p>
            <h2 className="mt-4 text-h2">Come and look at it</h2>
            <p className="mt-6 text-body-lead text-mulberry">
              Every manufacturer in this category says the same things about quality. The difference
              worth anything is whether you are allowed through the door.
            </p>
            <p className="mt-5 text-body text-cocoa">
              The plant is at {PLANT.place}, {PLANT.state}, and Google lists it as {PLANT.hours.toLowerCase()}.
              Several of the reviews above were written by people who had just been shown round it.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/plant/visit">Book a plant visit</ButtonLink>
              <ButtonLink href="/plant" variant="ghost">
                What we make it on
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delayIndex={1}>
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
              /* Deliberately an empty frame, not a fake one. */
              <div className="flex aspect-video flex-col items-center justify-center gap-4 border border-dashed border-cocoa/25 bg-paper/60 p-8 text-center">
                <Play className="size-10 text-cocoa-60" />
                <p className="text-caption text-cocoa-60">
                  Filmed plant tour to be shot on site.
                  <br />
                  No stock or generated footage stands in for it.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
