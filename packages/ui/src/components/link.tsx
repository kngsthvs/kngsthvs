import { Link as LinkPrimitive } from "../primitives/link";
import styles from "./link.module.css";

export function Link({
	children,
	disabled,
	...props
}: React.ComponentProps<typeof LinkPrimitive> & {
	disabled?: boolean;
}) {
	if (disabled) {
		return (
			<div className={styles.root} data-disabled>
				<span>{children}</span>

				{props.keys ? <kbd>[{props.keys}]</kbd> : null}
			</div>
		);
	}

	return (
		<LinkPrimitive className={styles.root} {...props}>
			{children}
		</LinkPrimitive>
	);
}
