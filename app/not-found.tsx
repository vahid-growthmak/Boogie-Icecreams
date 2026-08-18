import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container className="section-y text-center">
      <p className="eyebrow text-cocoa-60">404</p>
      <h1 className="mt-6 text-display-l">That flavour isn&rsquo;t here.</h1>
      <p className="mx-auto mt-6 max-w-md text-body text-cocoa">
        It may have been a seasonal one that has come out of rotation, or the link may have picked
        up a typo along the way.
      </p>
      <div className="mt-10 flex justify-center">
        <ButtonLink href="/products">See what is</ButtonLink>
      </div>
    </Container>
  );
}
