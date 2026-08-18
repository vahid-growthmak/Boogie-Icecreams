import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A lockfile in the home directory makes Next infer the wrong workspace root.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['motion'],
  },
};

export default nextConfig;
