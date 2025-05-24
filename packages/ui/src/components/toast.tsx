import styles from "./toast.module.css";

function Root({ children }: { children: React.ReactNode }) {
	return (
		<div aria-live="assertive" className={styles.root}>
			{children}
		</div>
	);
}

export const Toast = Object.assign(Root);
