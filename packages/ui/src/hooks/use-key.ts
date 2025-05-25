"use client";

import { useKeys } from "@kngsthvs/ui/functions/client/context/keys";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useKeyPress } from "react-use";

export function useKey(props: { href?: string; keys: string }) {
	const router = useRouter();
	const states = props.keys.split(/\+|\s/gi).map((key) => useKeyPress(key)[0]);
	const every = states.every((state) => state);

	const callback = useCallback(() => {
		if ("href" in props && props.href) {
			if (props.href.includes("://")) {
				window.open(props.href, "_blank", "noreferrer");
			} else {
				router.push(props.href);
			}
		}
	}, [props.href, router]);

	useKeys(props.keys, callback);

	return { every, states };
}
