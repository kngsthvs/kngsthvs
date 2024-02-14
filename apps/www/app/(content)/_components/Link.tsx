"use client";

import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/Link";
import { usePathname } from "next/navigation";
import { useApp } from "./Context";
import styles from "./Link.module.css";

export function Link({
  children,
  href,
  scroll = false,
}: React.PropsWithChildren<{ href: string; scroll?: boolean }>) {
  const pathname = usePathname();
  const { height } = useApp();

  return (
    <li className={`${styles.root} ${href === pathname ? styles.active : ""}`}>
      <LinkPrimitive
        onClick={() =>
          scroll &&
          typeof window !== "undefined" &&
          window.scrollTo({
            behavior: "smooth",
            top: height,
          })
        }
        {...{ href }}
      >
        {children}
      </LinkPrimitive>
    </li>
  );
}
