"use client";

import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Link, type LinkProps } from "@kngsthvs/ui/primitives/shared/link";
import { useState } from "react";
import { useInterval } from "react-use";
import { useKey } from "../hooks/use-key";
import styles from "./button.module.css";

function Loading() {
	const [count, setCount] = useState(1);

	useInterval(() => {
		if (count >= 3) {
			setCount(1);
		} else {
			setCount((value) => value + 1);
		}
	}, 150);

	return Array.from(Array(count))
		.map(() => ".")
		.join("");
}

export function Button({
	children,
	icon,
	keys,
	size = "medium",
	variant = "primary",
	...props
}: LinkProps &
	React.PropsWithChildren<{
		icon?: boolean;
		loading?: "true" | "false";
		keys?: string;
		size?: "small" | "medium" | "large";
		variant?: "primary" | "secondary" | "tertiary";
	}>) {
	const { states } = useKey({
		href: "href" in props ? String(props.href) : undefined,
		keys: keys ?? "",
	});
	const data = mapDataAttributes({ icon, pressed: states[0], size, variant });

	return (
		<Link className={styles.root} {...{ ...data, ...props }}>
			<span>
				{children}

				{props.loading === "true" ? <Loading /> : null}
			</span>

			{keys ? <kbd>[{keys}]</kbd> : ""}
		</Link>
	);
}
