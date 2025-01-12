import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
        output: process.env.GITHUB_ACTION ? 'export' : undefined,
        missingSuspenseWithCSRBailout: false,
};

export default nextConfig;
