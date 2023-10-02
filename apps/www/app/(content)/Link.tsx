"use client";

import NextLink from "next/link";
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
      <NextLink
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
      </NextLink>
    </li>
  );
}
