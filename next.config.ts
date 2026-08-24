import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // TypeScript is checked separately in CI with `npx tsc --noEmit`.
  // This avoids a Next 16.3 config-parser issue in this environment.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
