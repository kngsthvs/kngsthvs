"use client";

import { Ticker as TickerRoot } from "@kngsthvs/ui/components/client/ticker";
import { useMeasure } from "react-use";
import styles from "./styles.module.css";

export function Ticker({
  children,
}: React.PropsWithChildren<{ ticker?: boolean }>) {
  const [ref, { height, width }] = useMeasure<HTMLElement>();

  return (
    <aside className={styles.root} {...{ ref }}>
      <div
        style={
          {
            "--height": `${height}px`,
            "--width": `${width}px`,
            height: width,
            width: height,
          } as React.CSSProperties
        }
      >
        <TickerRoot direction="right" gap={16} source={0.5}>
          {children}
        </TickerRoot>
      </div>
    </aside>
  );
}
