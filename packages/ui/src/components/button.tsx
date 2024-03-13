"use client";

import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import {
  Link,
  type LinkProps,
  type LinkType,
} from "@kngsthvs/ui/primitives/shared/link";
import { forwardRef } from "react";
import { useKey } from "../hooks/useKey";
import styles from "./button.module.css";

export const Button = forwardRef<
  LinkType,
  LinkProps &
    React.PropsWithChildren<{
      keyName?: string;
      size?: "small" | "medium" | "large";
      variant?: "priamry" | "secondary";
    }>
>(
  (
    { children, keyName, size = "medium", variant = "primary", ...props },
    ref,
  ) => {
    const [pressed] = useKey({
      href: "href" in props ? String(props.href) : undefined,
      key: keyName ?? "",
    });
    const data = mapDataAttributes({ pressed, size, variant });

    return (
      <Link className={styles.root} {...{ ref, ...data, ...props }}>
        <span>{children}</span>

        {keyName ? <kbd>[{keyName}]</kbd> : ""}
      </Link>
    );
  },
);

Button.displayName = "Button";
