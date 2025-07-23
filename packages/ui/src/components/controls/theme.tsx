"use client";

import { visuallyHidden } from "@base-ui-components/react/utils";
import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { disableAnimation } from "@kngsthvs/ui/functions/client/disable-animation";
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
        <div style={visuallyHidden}>Default</div>
      </button>

      <button
        data-selected={theme === "red"}
        data-theme="red"
        onClick={() => {
          disableAnimation(updateTheme("red"));
        }}
        type="button"
      >
        <div style={visuallyHidden}>Red</div>
      </button>

      <button
        data-selected={theme === "green"}
        data-theme="green"
        onClick={() => {
          disableAnimation(updateTheme("green"));
        }}
        type="button"
      >
        <div style={visuallyHidden}>Green</div>
      </button>

      <button
        data-selected={theme === "blue"}
        data-theme="blue"
        onClick={() => {
          disableAnimation(updateTheme("blue"));
        }}
        type="button"
      >
        <div style={visuallyHidden}>Blue</div>
      </button>
    </div>
  );
}
