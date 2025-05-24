"use client";

import { useEffect, useState } from "react";

export function useScrollDirection(props?: { threshold?: number }) {
	const [direction, setDirection] = useState<"down" | "up">("up");

	useEffect(() => {
		let { pageYOffset: previousPageYOffset } = window;

		const listener = () => {
			window.requestAnimationFrame(() => {
				const { pageYOffset } = window;

				if (props?.threshold ?? 0 > Math.abs(pageYOffset - previousPageYOffset))
					return;

				setDirection(pageYOffset > previousPageYOffset ? "down" : "up");

				previousPageYOffset = pageYOffset > 0 ? pageYOffset : 0;
			});
		};

		window.addEventListener("scroll", listener);

		return () => window.removeEventListener("scroll", listener);
	}, [direction, props]);

	return [direction, setDirection];
}
