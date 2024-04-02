"use client";
import styles from "./aside.module.css";

export function Aside({ children }: { children: React.ReactNode }) {
  return (
    <aside className={styles.root}>
      <div>{children}</div>
    </aside>
  );
}
