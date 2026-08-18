import type { Metadata } from 'next';
import { Fraunces, Hanken_Grotesk } from 'next/font/google';
import Script from 'next/script';

import { CartDrawerMount } from '@/components/cart/CartDrawerMount';
import { CartIndexProvider } from '@/components/cart/CartIndexProvider';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/ui/JsonLd';
import { buildCartIndex } from '@/lib/catalog';
import { SITE_DESCRIPTION, SITE_NAME, organizationJsonLd, siteUrl, websiteJsonLd } from '@/lib/seo';

import './globals.css';

/** Variable font, one file. display: swap, latin only. PRD §4.3. */
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  // Variable weight 300–500 comes from the axis, not a weight list; SOFT and the
  // optical-size axis are what let the display-xl headline hold at 5.75rem.
  weight: 'variable',
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-hanken',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${SITE_NAME} — small batch ice cream, sorbet and desserts`, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: siteUrl(),
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Built on the server; display data only. Keeps content/ out of the client bundle.
  const cartIndex = buildCartIndex();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <CartIndexProvider index={cartIndex}>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawerMount />
        </CartIndexProvider>

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
