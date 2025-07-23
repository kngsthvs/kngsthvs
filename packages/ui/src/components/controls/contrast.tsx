"use client";

import { visuallyHidden } from "@base-ui-components/react/utils";
import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { disableAnimation } from "@kngsthvs/ui/functions/client/disable-animation";
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
      <div style={visuallyHidden}>High contrast</div>
    </button>
  );
}
