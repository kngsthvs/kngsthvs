import {
  Button as ButtonPrimitive,
  type LinkProps,
  type LinkType,
} from "@kngsthvs/ui/primitives";
import { forwardRef } from "react";
import styles from "./Button.module.css";

export const Button = forwardRef<LinkType, LinkProps>(
  ({ children, ...props }, ref) => {
    return (
      <ButtonPrimitive className={styles.root} {...{ ref, ...props }}>
        {children}
      </ButtonPrimitive>
    );
  }
);

Button.displayName = "Button";
