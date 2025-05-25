"use client";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { EB_Garamond } from "next/font/google";
import { useEffect } from "react";
import { env } from "@/env";
import { Fallback } from "./_components/fallback";

const EBGaramond = EB_Garamond({
  fallback: ["Garamond", "var(--fonts-serif)"],
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400"],
});

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} ${GeistSans.variable} ${GeistMono.variable} ${EBGaramond.variable}}`}
      >
        <Fallback title="Global Error">
          <span>
            Something went wrong while you were{" "}
            {env.NODE_ENV === "development" ? "working" : "browsing"}.
          </span>

          <button
            onClick={() => {
              window.location.reload();
            }}
            type="button"
          >
            Reload page
          </button>
        </Fallback>
      </body>
    </html>
  );
}
