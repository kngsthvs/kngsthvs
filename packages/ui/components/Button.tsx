import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Button as ButtonPrimitive } from "@kngsthvs/ui/primitives/shared/Button";
import { type LinkProps, type LinkType } from "@kngsthvs/ui/primitives/types";
import { forwardRef } from "react";
import styles from "./Button.module.css";

export const Button = forwardRef<
  LinkType,
  LinkProps & { variant?: "priamry" | "secondary" }
  // @ts-expect-error ts(2345)
>(({ children, variant = "primary", ...props }, ref) => {
  const data = mapDataAttributes({ variant });

  return (
    <ButtonPrimitive className={styles.root} {...{ ref, ...data, ...props }}>
      {children}
    </ButtonPrimitive>
  );
});

Button.displayName = "Button";
