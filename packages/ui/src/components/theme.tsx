"use client";

import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import type { getTheme } from "@kngsthvs/ui/functions/server/theme";
import { useEffect } from "react";

const themes = ["blue", "green", "red"];

export function Theme(props: Awaited<ReturnType<typeof getTheme>>) {
  const [{ cookies, localStorage }] = useTheme();

  useEffect(() => {
    if (
      (cookies ?? props).colorScheme === "light" &&
      localStorage.colorScheme !== "dark"
    ) {
      if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
      }

      if (!document.body.classList.contains("light")) {
        document.body.classList.add("light");
      }
    } else {
      if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
      }

      if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark");
      }
    }
  }, [cookies.colorScheme, localStorage.colorScheme]);

  useEffect(() => {
    if ((cookies ?? props).contrast === "more") {
      if (!document.body.classList.contains("contrast")) {
        document.body.classList.add("contrast");
      }
    } else if (document.body.classList.contains("contrast")) {
      document.body.classList.remove("contrast");
    }
  }, [cookies.contrast, localStorage.contrast]);

  useEffect(() => {
    const theme = (cookies ?? props).theme;
    if (!theme) return;
    if (typeof theme !== "string") return;

    if ((cookies ?? props).theme === "default") {
      if (document.body.classList.contains("blue")) {
        document.body.classList.remove("blue");
      } else if (document.body.classList.contains("green")) {
        document.body.classList.remove("green");
      } else if (document.body.classList.contains("red")) {
        document.body.classList.remove("red");
      }
    } else {
      themes
        .filter((value) => value !== theme)
        .forEach((value) => {
          document.body.classList.remove(value);
        });
      document.body.classList.add(theme);
    }
  }, [cookies.theme, localStorage.theme]);

  if (
    (cookies ?? props).colorScheme === "dark" ||
    localStorage.colorScheme === "dark"
  ) {
    return (
      <>
        <meta content="#000000" name="theme-color" />

        <style>
          {`:root {
            color-scheme: dark;
          }`}
        </style>
      </>
    );
  }

  return <meta content="#FFFFFF" name="theme-color" />;
}
