import { env } from "@/env";
import { type Themes } from "@/types/themes";
import { Provider as KeysProvider } from "@kngsthvs/ui/functions/client/context/keys";
import { Provider as ThemeProvider } from "@kngsthvs/ui/functions/client/context/theme";
import { getTheme } from "@kngsthvs/ui/functions/server/theme";
import { Toaster } from "@kngsthvs/ui/packages/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { type Metadata } from "next";
import "ui/styles";
import "ui/styles/globals.css";
import { Body } from "./_components/body";
import "./globals.css";

export const metadata: Metadata = {
  description:
    "“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
  title: "Kings & Thieves",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { colorScheme, contrast, theme, ...rest } = await getTheme<Themes>();

  return (
    <html lang="en">
      <KeysProvider>
        <ThemeProvider<Themes> {...{ colorScheme, contrast, theme, ...rest }}>
          <Body {...{ colorScheme, contrast, theme }}>
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
          </Body>
        </ThemeProvider>
      </KeysProvider>
    </html>
  );
}
