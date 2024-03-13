"use client";

import { useRouter } from "next/navigation";
import { useKey as reactUseKey, useKeyPress } from "react-use";

export function useKey(props: { href?: string; key: string }) {
  const router = useRouter();
  const keys = [props.key];

  const [pressed] = useKeyPress(props.key);

  reactUseKey(props.key, () => {
    if ("href" in props) {
      router.push(String(props.href));
    }
  });

  return [pressed];
}
