import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import {
  Link,
  type LinkProps,
  type LinkType,
} from "@kngsthvs/ui/primitives/shared/link";
import { forwardRef } from "react";
import styles from "./button.module.css";

export const Button = forwardRef<
  LinkType,
  LinkProps &
    React.PropsWithChildren<{
      size?: "small" | "medium" | "large";
      variant?: "priamry" | "secondary";
    }>
>(({ children, size = "medium", variant = "primary", ...props }, ref) => {
  const data = mapDataAttributes({ size, variant });

  return (
    <Link className={styles.root} {...{ ref, ...data, ...props }}>
      {children}
    </Link>
  );
});

Button.displayName = "Button";
