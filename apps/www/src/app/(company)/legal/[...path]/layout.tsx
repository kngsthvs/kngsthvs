import { Controls } from "@repo/ui/components/controls";
import { Footer } from "@repo/ui/components/footer";
import { Link } from "@repo/ui/components/link";
import { Title } from "@/app/_components/title";
import styles from "./layout.module.css";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className={styles.root}>
			<Title>Legal</Title>

			<main>
				<nav>
					<ul>
						<li>
							<Link href="/legal/dpa" keys="d">
								DPA
							</Link>
						</li>

						<li>
							<Link href="/legal/privacy" keys="p">
								Privacy Policy
							</Link>
						</li>

						<li>
							<Link href="/legal/terms" keys="t">
								Terms of Service
							</Link>
						</li>
					</ul>
				</nav>

				{children}
			</main>

			<div>
				<Footer />

				<Controls />
			</div>
		</section>
	);
}
