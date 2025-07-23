import bundleAnalyzer from "@next/bundle-analyzer";
import { withPayload } from "@payloadcms/next/withPayload";
import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === true,
});

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ hostname: "assets.basehub.com", protocol: "https" }],
	},
	reactStrictMode: true,
	transpilePackages: ["@kngsthvs/lib", "@kngsthvs/ui", "@repo/lib", "@repo/ui"],
};

export default withBundleAnalyzer(
	withPayload(withVercelToolbar(nextConfig), {
		devBundleServerPackages: false,
	}),
);
