"use client";

import { tinykeys } from "@kngsthvs/ui/packages/tinykeys";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Context({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      b: () => {
        router.back();
      },
      f: () => {
        router.forward();
      },
      h: () => {
        router.push("/");
      },
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return children;
}
