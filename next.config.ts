import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['ai-sdk-v5-agent-toolkit'],
  webpack: (config) => {
    config.resolve.symlinks = true;
    return config;
  },
};

export default nextConfig;
