"use client";

import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { disableAnimation } from "@kngsthvs/ui/functions/client/disable-animation";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import styles from "./theme.module.css";

export function Theme() {
  const [
    {
      cookies: { theme },
    },
    {
      cookies: { theme: updateTheme },
    },
  ] = useTheme();

  if (!theme) {
    updateTheme("default");
  }

  return (
    <div className={styles.root}>
      <button
        data-selected={!theme || theme === "default"}
        data-theme="default"
        onClick={() => {
          disableAnimation(updateTheme("default"));
        }}
        type="button"
      >
        <VisuallyHidden.Root>Default</VisuallyHidden.Root>
      </button>

      <button
        data-selected={theme === "red"}
        data-theme="red"
        onClick={() => {
          disableAnimation(updateTheme("red"));
        }}
        type="button"
      >
        <VisuallyHidden.Root>Red</VisuallyHidden.Root>
      </button>

      <button
        data-selected={theme === "green"}
        data-theme="green"
        onClick={() => {
          disableAnimation(updateTheme("green"));
        }}
        type="button"
      >
        <VisuallyHidden.Root>Green</VisuallyHidden.Root>
      </button>

      <button
        data-selected={theme === "blue"}
        data-theme="blue"
        onClick={() => {
          disableAnimation(updateTheme("blue"));
        }}
        type="button"
      >
        <VisuallyHidden.Root>Blue</VisuallyHidden.Root>
      </button>
    </div>
  );
}
