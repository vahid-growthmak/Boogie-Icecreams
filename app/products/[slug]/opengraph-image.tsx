import { ImageResponse } from 'next/og';

import { getAllProducts, getProductBySlug } from '@/lib/catalog';

export const alt = 'Boogie Ice Creams';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F5F1E8',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#7C1F45', fontStyle: 'italic' }}>
          boogie
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, color: '#7C1F45', display: 'flex', lineHeight: 1.05 }}>
            {product?.name ?? 'Boogie Ice Creams'}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: '#332B2E',
              display: 'flex',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {product?.strapline ?? 'Small batch ice cream, sorbet and frozen desserts.'}
          </div>
        </div>

        <div style={{ display: 'flex', height: 2, background: '#D2A65A' }} />
      </div>
    ),
    size,
  );
}
