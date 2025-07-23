// import bundleAnalyzer from "@next/bundle-analyzer";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled:
//     process.env.NODE_ENV === "development" && process.env.ANALYZE === "true",
//   openAnalyzer: false,
// });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@kngsthvs/lib", "@kngsthvs/ui", "@repo/lib", "@repo/ui"],
};

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
});
