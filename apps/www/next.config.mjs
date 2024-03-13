// import MillionCompiler from "@million/lint";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@kngsthvs/ui", "ui"],
};

// export default withBundleAnalyzer(MillionCompiler.next()(nextConfig));
export default withBundleAnalyzer(nextConfig);
