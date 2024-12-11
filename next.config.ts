import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    JWT_SECRET: "super-secret-key-123",
  },
  images: {
    domains: ["35.193.181.126"],
  },
};

export default nextConfig;
