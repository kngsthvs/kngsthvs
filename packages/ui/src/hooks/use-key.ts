"use client";

import { useKeys } from "@kngsthvs/ui/functions/client/context/keys";
import { useRouter } from "next/navigation";
import { useKeyPress } from "react-use";

export function useKey(props: { href?: string; keys: string }) {
  const router = useRouter();

  const states = props.keys.split(/\+|\s/gi).map((key) => useKeyPress(key)[0]);
  const every = states.every((state) => state);

  useKeys(props.keys, () => {
    if ("href" in props) {
      if (props.href?.includes("://")) {
        window.open(props.href, "_blank", "noreferrer");
      } else {
        router.push(String(props.href));
      }
    }
  });

  return { every, states };
}
