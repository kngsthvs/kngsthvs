"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Drawer as Vaul } from "vaul";
import styles from "./drawer.module.css";

export function Drawer({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [state, setState] = useState(false);

	useEffect(() => {
		setState(true);
	}, []);

	function onOpenChange(open: boolean) {
		setState(open);

		if (!open) {
			router.back();
		}
	}

	return (
		<Vaul.Root direction="right" open={state} {...{ onOpenChange }}>
			<Vaul.Portal>
				<Vaul.Overlay className={styles.overlay} />

				<Vaul.Content className={styles.content}>
					<div>{children}</div>
				</Vaul.Content>
			</Vaul.Portal>
		</Vaul.Root>
	);
}
