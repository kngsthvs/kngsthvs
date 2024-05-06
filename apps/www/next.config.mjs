import MillionCompiler from "@million/lint";
import bundleAnalyzer from "@next/bundle-analyzer";
import withVercelToolbar from "@vercel/toolbar/plugins/next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@kngsthvs/lib", "@kngsthvs/ui", "lib", "ui"],
};

export default withBundleAnalyzer(
  withVercelToolbar()(MillionCompiler.next()(nextConfig)),
);
