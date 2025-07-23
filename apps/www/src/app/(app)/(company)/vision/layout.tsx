import { Controls } from "@repo/ui/components/controls";
import { Footer } from "@repo/ui/components/footer";
import { basehub } from "basehub";
import { Logo } from "../../_components/logo";
import { Navigation } from "./_components/navigation";
import styles from "./layout.module.css";

export const revalidate = 60;

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { vision } = await basehub({ next: { revalidate: 60 } }).query({
		__typename: true,
		vision: {
			items: {
				_slug: true,
				_title: true,
				content: {
					json: { content: true },
				},
			},
		},
	});
	const links = [
		{
			href: "/vision",
			name: "Cover",
		},
		...vision.items.map((item) => ({
			href: `/vision/${item._slug}`,
			name: item._title,
		})),
		{
			href: "/vision/end",
			name: "End",
		},
	];

	return (
		<main className={styles.root}>
			<Logo>Vision</Logo>

			<div className={styles.slides}>
				<article>{children}</article>

				<Navigation {...{ links }} />
			</div>

			<div>
				<Footer />

				<Controls />
			</div>
		</main>
	);
}
