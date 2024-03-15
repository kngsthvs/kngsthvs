"use client";

import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/link";
import { usePathname } from "next/navigation";
import { useApp } from "./context";
import styles from "./link.module.css";

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
        onClick={() => {
          if (scroll && typeof window !== "undefined") {
            window.scrollTo({
              behavior: "smooth",
              top: height,
            });
          }
        }}
        {...{ href }}
      >
        {children}
      </LinkPrimitive>
    </li>
  );
}
