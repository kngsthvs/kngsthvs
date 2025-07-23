"use client";

import { visuallyHidden } from "@base-ui-components/react/utils";
import { useEffect, useState } from "react";
import { useScramble } from "use-scramble";
import styles from "./whispers.module.css";

export function Whispers(props: { whispers: (string | null)[] }) {
	const [index, setIndex] = useState(0);

	const { ref } = useScramble({
		overflow: true,
		scramble: 3,
		seed: 3,
		text: `${String(props.whispers[index])}.`,
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((value) => (value + 1) % props.whispers.length);
		}, 10 * 1000);

		return () => {
			clearInterval(interval);
		};
	}, [index, props.whispers.length]);

	return (
		<div
			className={styles.root}
			style={{ "--speed": 0.25 } as React.CSSProperties}
		>
			<p {...{ ref }} />

			<div style={visuallyHidden}>{props.whispers[0]}</div>
		</div>
	);
}
