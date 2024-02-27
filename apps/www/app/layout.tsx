import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font";
import { type Metadata } from "next";
import { Cormorant } from "next/font/google";
import "ui/styles";
import "ui/styles/globals.css";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--fonts-heading",
  weight: ["500"],
});

export const metadata: Metadata = {
  description:
    "“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
  title: "Kings & Thieves",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} ${cormorant.variable}`}>
        <link href="./favicon.svg" rel="icon" type="image/svg+xml" />

        {props.children}

        <Analytics />
      </body>
    </html>
  );
}
