"use client";

import {
  Link as LinkPrimitive,
  type LinkProps,
} from "@kngsthvs/ui/primitives/shared/link";
import { useKey } from "../hooks/useKey";
import styles from "./link.module.css";

export function Link({
  children,
  keyName,
  ...props
}: LinkProps &
  React.PropsWithChildren<{
    keyName?: string;
  }>) {
  const [pressed] = useKey({
    href: "href" in props ? String(props.href) : undefined,
    key: keyName ?? "",
  });

  return (
    <LinkPrimitive className={styles.root} data-pressed={pressed} {...props}>
      <span>{children}</span>

      {keyName ? <kbd>[{keyName}]</kbd> : ""}
    </LinkPrimitive>
  );
}
