"use client";

import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { disableAnimation } from "@kngsthvs/ui/functions/client/disable-animation";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import styles from "./contrast.module.css";

export function Contrast() {
  const [
    {
      cookies: { contrast },
    },
    {
      cookies: { contrast: updateContrast },
    },
  ] = useTheme();

  return (
    <button
      className={styles.root}
      data-active={contrast === "more"}
      onClick={() => {
        if (contrast === "more") {
          disableAnimation(updateContrast("less"));
        } else {
          disableAnimation(updateContrast("more"));
        }
      }}
      type="button"
    >
      <VisuallyHidden.Root>High contrast</VisuallyHidden.Root>
    </button>
  );
}
