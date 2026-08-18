'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="section-y text-center">
      <h1 className="text-display-l">Something broke on our end.</h1>
      <p className="mx-auto mt-6 max-w-md text-body text-cocoa">
        Nothing you did caused this and nothing in your cart was lost.
      </p>
      <div className="mt-10 flex justify-center">
        <Button onClick={reset}>Try again</Button>
      </div>
    </Container>
  );
}
