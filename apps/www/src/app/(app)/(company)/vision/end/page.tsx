"use client";

import Link from "next/link";
import slideStyles from "../[slide]/page.module.css";
import styles from "./page.module.css";

export default function Page() {
	return (
		<div className={`${slideStyles.root} ${styles.root}`}>
			<p>
				<Link className={styles.link} href="/">
					<span>&#9767;</span>

					<span>Return home</span>
				</Link>
			</p>
		</div>
	);
}
