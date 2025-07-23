// import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled:
//     process.env.NODE_ENV === "development" && process.env.ANALYZE === "true",
//   openAnalyzer: false,
// });

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "assets.basehub.com", protocol: "https" }],
  },
  reactStrictMode: true,
  transpilePackages: ["@kngsthvs/lib", "@kngsthvs/ui", "@repo/lib", "@repo/ui"],
};

export default nextConfig;
