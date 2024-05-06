import MillionCompiler from "@million/lint";
import bundleAnalyzer from "@next/bundle-analyzer";
import withVercelToolbar from "@vercel/toolbar/plugins/next";

const env = {
  analyze: process.env.ANALYZE === true,
  production: process.env.NODE_ENV === "production",
};
const withBundleAnalyzer = bundleAnalyzer({
  enabled: env.analyze,
});

/**
 * @see https://beta.tauri.app/start/frontend-configuration/nextjs/#example-configuration
 */
export default async (phase, { defaultConfig }) => {
  let internalHost = null;
  // In dev mode we use the internal-ip to serve the assets
  if (!env.production) {
    const { internalIpV4 } = await import("internal-ip");
    internalHost = await internalIpV4();
  }

  /** @type {import("next").NextConfig} */
  const nextConfig = {
    assetPrefix: env.production ? null : `http://${internalHost}:3000`,
    // async headers() {
    //   return [
    //     {
    //       headers: [
    //         {
    //           key: "Referrer-Policy",
    //           value: "no-referrer ",
    //         },
    //       ],
    //       source: "/auth/:path*",
    //     },
    //   ];
    // },
    images: {
      unoptimized: true,
    },
    output: "export",
    reactStrictMode: true,
    transpilePackages: ["@kngsthvs/lib", "@kngsthvs/ui", "lib", "ui"],
  };

  return withBundleAnalyzer(
    withVercelToolbar()(MillionCompiler.next()(nextConfig)),
  );
};
