import { Controls } from "@repo/ui/components/controls";
import { Footer } from "@repo/ui/components/footer";
import { Logo } from "../../_components/logo";
import styles from "./layout.module.css";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className={styles.root}>
			<Logo>Directory</Logo>

			{children}

			<div>
				<Footer />

				<Controls />
			</div>
		</main>
	);
}
