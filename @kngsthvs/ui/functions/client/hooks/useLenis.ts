"use client";

/**
 * @see https://github.com/studio-freight/lenis
 */

import {
  useLenis as useReactLenis,
  type CallbackFunction,
} from "@studio-freight/react-lenis";

type Lenis = {
  destroy: () => void;
  on: (id: "scroll", callback: () => void) => void;
  raf: number;
  resize: () => void;
  scrollTo: (
    target:
      | number
      | "top"
      | "left"
      | "start"
      | "bottom"
      | "right"
      | "end"
      // eslint-disable-next-line @typescript-eslint/ban-types
      | (string & {}),
    options?: {
      duration?: number;
      easing?: () => void;
      force?: boolean;
      immediate?: boolean;
      lerp?: number;
      lock?: boolean;
      offset?: number;
      onComplete?: () => void;
    },
  ) => void;
  start: () => void;
  stop: () => void;
};

export function useLenis(props?: CallbackFunction) {
  const lenis = useReactLenis(props);

  return lenis;
}
