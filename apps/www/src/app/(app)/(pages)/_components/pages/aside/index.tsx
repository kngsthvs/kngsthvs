"use client";

import styles from "./styles.module.css";

export function Aside({ children }: { children: React.ReactNode }) {
	return (
		<aside className={styles.root}>
			<div>{children}</div>
		</aside>
	);
}
