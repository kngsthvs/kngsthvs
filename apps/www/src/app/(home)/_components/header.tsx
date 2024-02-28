"use client";

import { useEffect } from "react";
import { useMeasure } from "react-use";
import { useApp } from "./context";
import styles from "./header.module.css";

export function Header({ children }: { children: React.ReactNode }) {
  const { setHeight } = useApp();
  const [ref, { height }] = useMeasure<HTMLElement>();

  useEffect(() => {
    setHeight(height);
  }, [height, setHeight]);

  return (
    <header className={styles.root} {...{ ref }}>
      {children}
    </header>
  );
}
