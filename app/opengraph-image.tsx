import { ImageResponse } from 'next/og';

export const alt = 'Boogies Ice Cream — small batch ice cream, sorbet and desserts';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#F5F1E8',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 96,
            left: 0,
            right: 0,
            height: 2,
            background: '#D2A65A',
          }}
        />
        <div style={{ fontSize: 104, color: '#4A2214', display: 'flex' }}>Boogies</div>
        <div
          style={{
            marginTop: 8,
            fontSize: 34,
            letterSpacing: 12,
            textTransform: 'uppercase',
            color: '#7C4A32',
            display: 'flex',
          }}
        >
          Ice Cream
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#332B2E',
            display: 'flex',
          }}
        >
          Small batch · Big boogie
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 96,
            left: 0,
            right: 0,
            height: 2,
            background: '#D2A65A',
          }}
        />
      </div>
    ),
    size,
  );
}
