import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Button as ButtonPrimitive } from "@kngsthvs/ui/primitives/shared/button";
import { type LinkProps, type LinkType } from "@kngsthvs/ui/primitives/types";
import { forwardRef } from "react";
import styles from "./button.module.css";

export const Button = forwardRef<
  LinkType,
  LinkProps & {
    size?: "small" | "medium" | "large";
    variant?: "priamry" | "secondary";
  }
>(({ children, size = "medium", variant = "primary", ...props }, ref) => {
  const data = mapDataAttributes({ size, variant });

  return (
    <ButtonPrimitive className={styles.root} {...{ ref, ...data, ...props }}>
      {children}
    </ButtonPrimitive>
  );
});

Button.displayName = "Button";
