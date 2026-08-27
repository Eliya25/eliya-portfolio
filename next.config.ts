import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname:
          "/Eliya25/lumiere-ai-movie-concierge/3e6a913507b91887578e2cccc11edeb37a94973b/**",
      },
    ],
  },
};

export default nextConfig;
