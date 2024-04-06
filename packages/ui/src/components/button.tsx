"use client";

import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import {
  Link,
  type LinkProps,
  type LinkType,
} from "@kngsthvs/ui/primitives/shared/link";
import { forwardRef, useState } from "react";
import { useInterval } from "react-use";
import { useKey } from "../hooks/use-key";
import styles from "./button.module.css";

function Loading() {
  const [count, setCount] = useState(1);

  useInterval(() => {
    if (count >= 3) {
      setCount(1);
    } else {
      setCount((value) => value + 1);
    }
  }, 150);

  return Array.from(Array(count))
    .map(() => ".")
    .join("");
}

export const Button = forwardRef<
  LinkType,
  LinkProps &
    React.PropsWithChildren<{
      icon?: boolean;
      loading?: "true" | "false";
      keys?: string;
      size?: "small" | "medium" | "large";
      variant?: "priamry" | "secondary" | "tertiary";
    }>
>(
  (
    { children, icon, keys, size = "medium", variant = "primary", ...props },
    ref,
  ) => {
    const { pressed } = useKey({
      href: "href" in props ? String(props.href) : undefined,
      keys: keys ?? "",
    });
    const data = mapDataAttributes({ icon, pressed, size, variant });

    return (
      <Link className={styles.root} {...{ ref, ...data, ...props }}>
        <span>
          {children}

          {Boolean(props.loading) ? <Loading /> : null}
        </span>

        {keys ? <kbd>[{keys}]</kbd> : ""}
      </Link>
    );
  },
);

Button.displayName = "Button";
