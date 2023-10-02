import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { Cormorant, Inter } from "next/font/google";
import "ui/styles";
import "ui/styles/globals.css";
import "./globals.css";

const cormorant = Cormorant({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  description:
    "“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
  title: "Kings & Thieves",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${cormorant.variable}`}
      >
        {children}
        <>
          <Analytics />
        </>
      </body>
    </html>
  );
}
