// import MillionCompiler from "@million/lint";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    useDeploymentId: true,
    useDeploymentIdServerActions: true,
  },
  reactStrictMode: true,
  transpilePackages: ["@kngsthvs/lib", "@kngsthvs/ui", "ui"],
};

// export default withBundleAnalyzer(MillionCompiler.next()(nextConfig));
export default withBundleAnalyzer(nextConfig);
