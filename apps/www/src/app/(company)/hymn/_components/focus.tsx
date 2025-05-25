"use client";

import { useTheme } from "@kngsthvs/ui/functions/client/context/theme";
import { disableAnimation } from "@kngsthvs/ui/functions/client/disable-animation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePages } from "../../../(pages)/_components/pages";

export function Focus() {
	const { setFocus, setTitle } = usePages();
	const pathname = usePathname();
	const [_state, update] = useTheme();

	disableAnimation(update.localStorage.colorScheme("dark"));

	useEffect(() => {
		setFocus(true);
		setTitle("Hymn");
	}, [pathname]);

	return null;
}
