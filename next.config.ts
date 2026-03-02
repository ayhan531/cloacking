import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disabling experimental features to stabilize build
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
