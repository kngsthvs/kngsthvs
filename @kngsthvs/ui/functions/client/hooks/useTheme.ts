"use client";

import { useContext } from "react";
import { type GetThemeReturn } from "../../types";
import { Theme } from "../context/theme";

export function useTheme(): GetThemeReturn {
  const context = useContext(Theme.Context);

  if (context === undefined) {
    throw new Error("useTheme must be used within an Theme.Provider");
  }

  return context;
}
