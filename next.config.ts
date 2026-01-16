import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to https://<username>.github.io/<repo-name>, valid basePath is required.
  // basePath: '/bansi', 
};

export default nextConfig;
