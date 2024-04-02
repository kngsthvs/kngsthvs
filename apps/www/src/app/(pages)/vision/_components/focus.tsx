"use client";

import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { disableAnimation } from "@kngsthvs/ui/functions/client/disable-animation";
import { useEffect } from "react";
import { usePages } from "../../_components/pages";

export function Focus() {
  const { setFocus, setTitle } = usePages();
  const [_state, update] = useTheme();

  disableAnimation(update.localStorage.colorScheme("dark"));

  useEffect(() => {
    setFocus(true);
    setTitle("Vision");
  }, []);

  return null;
}
