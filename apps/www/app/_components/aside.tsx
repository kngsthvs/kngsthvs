"use client";

import { Ticker } from "@kngsthvs/ui/components/client/ticker";
import { useMeasure, useMedia } from "react-use";
import styles from "./aside.module.css";

export function Aside({
  children,
  ticker,
}: React.PropsWithChildren<{ ticker?: boolean }>) {
  const [ref, { height, width }] = useMeasure<HTMLElement>();
  const isWide = useMedia("(min-width: 48rem)", false);

  return (
    <aside className={styles.root} {...{ ref }}>
      {ticker ? (
        <div
          className={styles.ticker}
          style={{
            height: isWide ? width : "3.75rem",
            width: isWide ? height : "auto",
          }}
        >
          <Ticker direction="right" gap={16} source={0.5}>
            {children}
          </Ticker>
        </div>
      ) : (
        <div
          className={styles.item}
          style={{
            height: isWide ? width : "auto",
            transform: isWide
              ? `rotate(270deg) translate(calc(50% - 2rem), calc(${
                  height / 2
                }px - 50%))`
              : "none",
            width: isWide ? height : "auto",
          }}
        >
          {children}
        </div>
      )}
    </aside>
  );
}
