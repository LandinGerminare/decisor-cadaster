import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignora erros do ESLint no build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
