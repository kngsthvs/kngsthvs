import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@kngsthvs/ui", "ui"],
};

export default withBundleAnalyzer(nextConfig);
