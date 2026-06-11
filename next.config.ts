import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 95],
    minimumCacheTTL: 0,
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
