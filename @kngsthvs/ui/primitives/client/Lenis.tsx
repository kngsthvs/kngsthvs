"use client";

/**
 * @see https://github.com/studio-freight/lenis
 * @see https://github.com/studio-freight/react-lenis
 */

import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

export function Lenis({
  children,
  ...props
}: React.PropsWithChildren<{
  autoResize?: boolean;
  content?: HTMLElement;
  duration?: number;
  easing?: () => void;
  eventsTarget?: HTMLElement | Window;
  gestureOrientation?: "both" | "horizontal" | "vertical";
  infinite?: boolean;
  lerp?: number;
  normalizeWheel?: boolean;
  orientation?: "horizontal" | "vertical";
  root?: boolean;
  smoothTouch?: boolean;
  smoothWheel?: boolean;
  syncTouch?: boolean;
  syncLerp?: number;
  touchInertiaMultiplier?: number;
  touchMultiplier?: number;
  wheelMultiplier?: number;
  wrapper?: HTMLElement | Window;
}>) {
  return <ReactLenis {...props}>{children}</ReactLenis>;
}
