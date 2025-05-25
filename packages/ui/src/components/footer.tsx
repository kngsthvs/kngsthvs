import { Copyright } from "./copyright";
import styles from "./footer.module.css";

export function Footer() {
	return (
		<div className={styles.root}>
			<div className={styles.flag} />

			<p>American built, owned, and operated.</p>

			<Copyright />
		</div>
	);
}
