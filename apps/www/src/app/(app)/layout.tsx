import { Provider as KeysProvider } from "@kngsthvs/ui/functions/client/context/keys";
import { Provider as ThemeProvider } from "@kngsthvs/ui/functions/client/context/theme";
import { getTheme } from "@kngsthvs/ui/functions/server/theme";
import type { Themes } from "@repo/lib/types/themes";
import { Theme } from "@repo/ui/components/theme";
import { env } from "@/env";
import "@repo/ui/styles";
import "@repo/ui/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { Motion } from "./_components/motion";
import "./globals.css";

const EBGaramond = EB_Garamond({
  fallback: ["Garamond", "var(--fonts-serif)"],
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400"],
});

export const metadata: Metadata = {
  description:
    "“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
  metadataBase: new URL("https://www.kngsthvs.com"),
  title: "Kings & Thieves",
};

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  const theme = await getTheme<Themes>();
  const className = [
    theme.colorScheme === "dark" ? "dark" : "light",
    theme.contrast === "more" ? "contrast" : "",
    theme.theme === "default" ? "" : theme.theme,
  ].filter((value) => value);

  return (
    <html lang="en">
      <KeysProvider>
        <ThemeProvider<Themes> {...theme}>
          <body
            className={`${GeistSans.className} ${GeistSans.variable} ${GeistMono.variable} ${EBGaramond.variable} ${className.join(" ")}`}
          >
            <Theme {...theme} />

            <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

            <Motion>{props.children}</Motion>

            {/* Vercel */}
            <Analytics />
            <SpeedInsights />
            {env.NODE_ENV === "development" && <VercelToolbar />}
          </body>
        </ThemeProvider>
      </KeysProvider>
    </html>
  );
}
