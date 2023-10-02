"use client";

import { useEffect } from "react";
import { useMeasure } from "react-use";
import { useApp } from "./Context";
import styles from "./Header.module.css";

export function Header({ children }) {
  const { setHeight } = useApp();
  const [ref, { height }] = useMeasure<HTMLElement>();

  useEffect(() => {
    setHeight && setHeight(height);
  }, [height]);

  return (
    <header className={styles.root} {...{ ref }}>
      {children}
    </header>
  );
}
