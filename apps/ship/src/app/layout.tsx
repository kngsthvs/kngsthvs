import { Provider as KeysProvider } from "@kngsthvs/ui/functions/client/context/keys";
import { env } from "@/app/env";
import "@repo/ui/styles";
import "@repo/ui/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
	description:
		"“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
	title: "Ship",
};

export default function RootLayout(
	props: Readonly<{
		children: React.ReactNode;
	}>,
) {
	// const theme = await getTheme<Theme

	return (
		<html lang="en">
			<KeysProvider>
				<body className={`${GeistSans.className} ${GeistMono.variable}`}>
					<link href="/favicon.svg" rel="icon" type="image/svg+xml" />

					{props.children}

					<Toaster
						expand
						gap={8}
						offset={16}
						position="top-right"
						toastOptions={{
							style: {
								width: "100%",
								zIndex: 100,
							},
						}}
						visibleToasts={10}
					/>

					{/* Vercel */}
					<Analytics />
					<SpeedInsights />
					{env.NODE_ENV === "development" && <VercelToolbar />}
				</body>
			</KeysProvider>
		</html>
	);
}
