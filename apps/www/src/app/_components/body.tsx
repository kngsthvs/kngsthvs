"use client";

import { type Themes } from "@/types/themes";
import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import {
  type ColorScheme,
  type Contrast,
} from "@kngsthvs/ui/functions/types/theme";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
// eslint-disable-next-line camelcase -- Allow non-camelCase font name
import { EB_Garamond } from "next/font/google";

const EBGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--fonts-heading",
  weight: ["400"],
});

export function Body({
  children,
  ...props
}: {
  children: React.ReactNode;
  colorScheme?: ColorScheme;
  contrast?: Contrast;
  theme?: Themes;
}) {
  const [{ cookies, localStorage }] = useTheme();
  const colorScheme =
    (cookies.colorScheme ?? props.colorScheme) === "light" &&
    localStorage.colorScheme !== "dark"
      ? "light"
      : "dark";
  const contrast = cookies.contrast === "more" ? "contrast" : "";
  const theme =
    (cookies.theme ?? props.theme) === "default"
      ? ""
      : cookies.theme ?? props.theme;

  return (
    <body
      className={`${GeistSans.className} ${GeistMono.variable} ${EBGaramond.variable} ${colorScheme} ${contrast} ${theme}`}
    >
      {cookies.colorScheme === "dark" || localStorage.colorScheme === "dark" ? (
        <>
          <meta content="#000000" name="theme-color" />

          <style>
            {`:root {
                color-scheme: dark;
              }`}
          </style>
        </>
      ) : (
        <meta content="#FFFFFF" name="theme-color" />
      )}

      {children}
    </body>
  );
}
