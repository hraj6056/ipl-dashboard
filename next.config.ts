import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "scores.iplt20.com",
      "feeds-100mb.s3-ap-southeast-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
