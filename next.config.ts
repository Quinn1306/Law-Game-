import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/era-law-game",
  images: { unoptimized: true },
};

export default nextConfig;
