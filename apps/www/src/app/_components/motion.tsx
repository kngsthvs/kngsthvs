"use client";

import { LazyMotion } from "framer-motion";

export function Motion({
  children,
  ...props
}: React.PropsWithChildren<
  Omit<React.ComponentProps<typeof LazyMotion>, "features">
>) {
  return (
    <LazyMotion
      features={() =>
        import("../../lib/features.js").then((res) => res.default)
      }
      strict
      {...props}
    >
      {children}
    </LazyMotion>
  );
}
