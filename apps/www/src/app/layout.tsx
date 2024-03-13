import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "ui/styles";
import "ui/styles/globals.css";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--fonts-heading",
  weight: ["400"],
});

export const metadata: Metadata = {
  description:
    "“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
  title: "Kings & Thieves",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${GeistMono.variable} ${garamond.variable}`}
      >
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

        {props.children}

        {/* Vercel */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
