"use client";

import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { useEffect } from "react";

export function Theme() {
  const [{ cookies, localStorage }] = useTheme();

  useEffect(() => {
    if (
      cookies.colorScheme === "light" &&
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
    if (cookies.contrast === "more") {
      if (!document.body.classList.contains("contrast")) {
        document.body.classList.add("contrast");
      }
    } else if (document.body.classList.contains("contrast")) {
      document.body.classList.remove("contrast");
    }
  }, [cookies.contrast, localStorage.contrast]);

  // useEffect(() => {
  //   cookies.theme === "default" ? "" : cookies.theme;
  // }, [cookies.theme, localStorage.theme]);

  if (cookies.colorScheme === "dark" || localStorage.colorScheme === "dark") {
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
