"use client";

import { useKeys } from "@kngsthvs/ui/functions/client/context/keys";
import { useRouter } from "next/navigation";
import { useKeyPress } from "react-use";

export function useKey(props: { href?: string; keys: string }) {
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

  useKeys(props.keys, () => {
    if ("href" in props) {
      if (props.href?.includes("://")) {
        window.open(props.href, "_blank", "noreferrer");
      } else {
        router.push(String(props.href));
      }
    }
  });

  return { pressed };
}
