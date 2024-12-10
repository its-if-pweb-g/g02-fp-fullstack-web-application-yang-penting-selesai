import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    JWT_SECRET: "super-secret-key-123",
  },
};

export default nextConfig;
