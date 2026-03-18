import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: false,
  webpack(config, { dev }) {
    if (!dev) {
      config.optimization.minimize = false;
    }

    return config;
  },
};

export default nextConfig;
