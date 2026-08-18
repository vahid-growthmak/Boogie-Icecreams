import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Centred, wide margins, Fraunces 400 at 1.5rem / 1.6. Static in v1.
 *
 * TODO(copy): this quote is placeholder and must be replaced with a real,
 * attributable customer quote before launch. An invented testimonial is an
 * invented fact — same rule as an invented award.
 */
export function Testimonial() {
  return (
    <section className="section-y">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-[1.5rem] leading-[1.6] text-mulberry">
            The mango sorbet turned up frozen solid in the middle of June and tasted like it had
            been made that morning. We have ordered it four times since.
          </blockquote>
          <figcaption className="mt-8 text-caption text-cocoa-60">
            Placeholder quote — awaiting a real, attributable customer
          </figcaption>
        </Reveal>
      </Container>
    </section>
  );
}
