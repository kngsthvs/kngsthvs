"use client";

import { useRouter } from "next/navigation";
import { HotkeysProvider, useHotkeys } from "react-hotkeys-hook";

export function Context({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useHotkeys("b", () => {
    router.back();
  });

  useHotkeys("f", () => {
    router.forward();
  });

  useHotkeys("h", () => {
    router.push("/");
  });

  return (
    <HotkeysProvider initiallyActiveScopes={["pages"]}>
      {children}
    </HotkeysProvider>
  );
}
