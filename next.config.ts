import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'bansi';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Set basePath for GitHub Pages (project repository)
  basePath: isProd ? `/${repoName}` : '',
};

export default nextConfig;
