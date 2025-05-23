import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "itbook.store",
        pathname: "/img/books/**",
      },
    ],
    domains: ["cdn-icons-png.flaticon.com", "localhost"],
  }
  /* config options here */
};

export default nextConfig;
