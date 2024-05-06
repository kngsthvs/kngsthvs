import { env } from "@/env";
import { Provider as KeysProvider } from "@kngsthvs/ui/functions/client/context/keys";
import { Provider as ThemeProvider } from "@kngsthvs/ui/functions/client/context/theme";
import { getTheme } from "@kngsthvs/ui/functions/server/theme";
import { Toaster } from "@kngsthvs/ui/packages/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Themes } from "lib/types/themes";
import { type Metadata } from "next";
import { Theme } from "ui/components/theme";
import "ui/styles";
import "ui/styles/globals.css";
import "./globals.css";
// eslint-disable-next-line camelcase -- Allow non-camelCase font name
import { EB_Garamond } from "next/font/google";

const EBGaramond = EB_Garamond({
  fallback: ["Garamond", "var(--fonts-serif)"],
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400"],
});

export const metadata: Metadata = {
  description:
    "“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
  title: "Kings & Thieves",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
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
        </ThemeProvider>
      </KeysProvider>
    </html>
  );
}
