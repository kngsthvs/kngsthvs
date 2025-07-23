import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const env = {
  analyze: process.env.ANALYZE === true,
  host: process.env.TAURI_DEV_HOST || "localhost",
  production: process.env.NODE_ENV === "production",
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: env.analyze,
});

const nextConfig: NextConfig = {
  // Configure assetPrefix or else the server won't properly resolve your assets.
  assetPrefix: env.production ? undefined : `http://${env.host}:3000`,
  // Note: This feature is required to use the Next.js Image component in SSG mode.
  // See https://nextjs.org/docs/messages/export-image-api for different workarounds.
  images: {
    unoptimized: true,
  },
  // Ensure Next.js uses SSG instead of SSR
  // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["@kngsthvs/lib", "@kngsthvs/ui", "@repo/lib", "@repo/ui"],
};

export default withBundleAnalyzer(nextConfig);
