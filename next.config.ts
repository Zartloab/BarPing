import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  outputFileTracingRoot: projectDir,
  basePath: process.env.NODE_ENV === "production" ? "/BarPing" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/BarPing/" : "",
  experimental: {
    cpus: 1
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
