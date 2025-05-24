"use client";

import { Button } from "@repo/ui/components/button";
import { useKey } from "@repo/ui/hooks/use-key";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navigation.module.css";

export function Navigation({
	links,
}: {
	links: { href: string; name: string }[];
}) {
	const pathname = usePathname();
	const current = links.find((link) => link.href === pathname);
	const currentIndex = current ? links.indexOf(current) : 0;
	const prev = links[currentIndex - 1]?.href ?? "/vision";
	const next = links[currentIndex + 1]?.href ?? "";
	const left = useKey({
		href: prev,
		keys: "ArrowLeft",
	});
	const right = useKey({
		href: next,
		keys: "ArrowRight",
	});

	return (
		<nav className={styles.root}>
			<div>
				<Button
					data-pressed={left.states[0]}
					disabled={pathname === links[0]?.href}
					href={prev}
					variant="tertiary"
				>
					&lt; Prev
				</Button>

				<hr />

				<Button
					data-pressed={right.states[0]}
					disabled={pathname === links.at(-1)?.href}
					href={next}
					variant="tertiary"
				>
					Next &gt;
				</Button>
			</div>

			<div>
				<ul>
					{links.map((link) => (
						<li key={link.href}>
							<Link data-active={pathname === link.href} href={link.href}>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
