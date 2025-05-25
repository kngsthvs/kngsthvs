import MillionLint from "@million/lint";
import bundleAnalyzer from "@next/bundle-analyzer";
import withVercelToolbar from "@vercel/toolbar/plugins/next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "assets.basehub.com", protocol: "https" }],
  },
  reactStrictMode: true,
  transpilePackages: ["@kngsthvs/lib", "@kngsthvs/ui", "@repo/lib", "@repo/ui"],
};

export default withBundleAnalyzer(
  withVercelToolbar(MillionLint.next({ rsc: true })(nextConfig)),
);
