"use client";

import { tinykeys } from "@kngsthvs/ui/packages/tinykeys";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useKeyPress } from "react-use";

export function useKey(props: { href?: string; keys: string | string[] }) {
  const router = useRouter();
  const [pressed] = useKeyPress(
    props.keys.includes("+")
      ? Array.isArray(props.keys)
        ? props.keys.includes("+")
          ? props.keys[0]?.split("+")[0]
          : props.keys[0]
        : props.keys.split("+")[0]
      : props.keys[0],
  );

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      [`${props.keys}`]: (event) => {
        // Check if single key mappings are the only key being pressed
        if (props.keys.length > 1 || props.keys === event.key) {
          if ("href" in props) {
            if (props.href?.includes("://")) {
              window.open(props.href, "_blank", "noreferrer");
            } else {
              router.push(String(props.href));
            }
          }
        }
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { pressed };
}
