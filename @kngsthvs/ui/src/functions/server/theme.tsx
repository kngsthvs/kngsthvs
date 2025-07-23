import "server-only";

import { cookies } from "next/headers";
import type {
  ColorScheme,
  Contrast,
  GetThemeReturn,
  ReducedMotion,
  ReducedTransparency,
} from "../types/theme";

export async function getTheme<T = undefined>(): Promise<GetThemeReturn<T>> {
  const cookieStore = await cookies();

  const colorScheme = cookieStore.get("colorScheme")?.value as
    | ColorScheme
    | undefined;
  const contrast = cookieStore.get("contrast")?.value as Contrast | undefined;
  const prefers = {
    colorScheme: cookieStore.get("prefersColorScheme")?.value as
      | ColorScheme
      | undefined,
    contrast: cookieStore.get("prefersContrast")?.value as Contrast | undefined,
    reducedMotion: cookieStore.get("prefersReducedMotion")?.value as
      | ReducedMotion
      | undefined,
    reducedTransparency: cookieStore.get("prefersReducedTransparency")
      ?.value as ReducedTransparency | undefined,
  };
  const reducedMotion = cookieStore.get("reducedMotion")?.value as
    | ReducedMotion
    | undefined;
  const reducedTransparency = cookieStore.get("reducedTransparency")?.value as
    | ReducedTransparency
    | undefined;
  const theme = cookieStore.get("theme")?.value as T;

  return {
    colorScheme,
    contrast,
    prefers,
    reducedMotion,
    reducedTransparency,
    theme,
  };
}

export async function setTheme<T = undefined>({
  colorScheme,
  contrast,
  reducedMotion,
  reducedTransparency,
  theme,
}: GetThemeReturn<T>) {
  "use server";

  const cookieStore = await cookies();

  if (colorScheme) {
    cookieStore.set("colorScheme", colorScheme);
  }

  if (contrast) {
    cookieStore.set("contrast", contrast);
  }

  if (reducedMotion) {
    cookieStore.set("reducedMotion", reducedMotion);
  }

  if (reducedTransparency) {
    cookieStore.set("reducedTransparency", reducedTransparency);
  }

  if (theme) {
    cookieStore.set("theme", theme as string);
  }
}
