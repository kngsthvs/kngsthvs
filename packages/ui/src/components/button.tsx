"use client";

import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import {
  Link,
  type LinkProps,
  type LinkType,
} from "@kngsthvs/ui/primitives/shared/link";
import { forwardRef } from "react";
import { useKey } from "../hooks/use-key";
import styles from "./button.module.css";

export const Button = forwardRef<
  LinkType,
  LinkProps &
    React.PropsWithChildren<{
      keys?: string;
      size?: "small" | "medium" | "large";
      variant?: "priamry" | "secondary";
    }>
>(({ children, keys, size = "medium", variant = "primary", ...props }, ref) => {
  const { pressed } = useKey({
    href: "href" in props ? String(props.href) : undefined,
    keys: keys ?? "",
  });
  const data = mapDataAttributes({ pressed, size, variant });

  return (
    <Link className={styles.root} {...{ ref, ...data, ...props }}>
      <span>{children}</span>

      {keys ? <kbd>[{keys}]</kbd> : ""}
    </Link>
  );
});

Button.displayName = "Button";
