"use client";

import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
// import { visuallyHidden } from "@base-ui-components/react/utils";
import { Link as LinkSharedPrimitive } from "@kngsthvs/ui/primitives/shared/link";
import { Link } from "@repo/ui/components/link";
import linkStyles from "@repo/ui/components/link.module.css";
import { useKey } from "@repo/ui/hooks/use-key";
// import { Link as LinkPrimitive } from "@repo/ui/primitives/link";
// import Image from "next/image";
import { useKeyPress } from "react-use";
import styles from "./footer.module.css";

function Item({
	children,
	keys,
	...props
}: {
	children: React.ReactNode;
	keys?: string;
} & React.ComponentProps<typeof LinkSharedPrimitive>) {
	useKey({
		href: "href" in props ? String(props.href) : undefined,
		keys: keys ?? "",
	});
	const [pressed] = useKeyPress(keys?.at(-1));

	return (
		<LinkSharedPrimitive
			className={linkStyles.root}
			data-pressed={pressed}
			{...props}
		>
			<kbd>[{keys?.at(-1)}]</kbd>

			<span>{children}</span>
		</LinkSharedPrimitive>
	);
}

// function Social({
// 	children,
// 	keys,
// 	...props
// }: {
// 	children: React.ReactNode;
// 	href: string;
// 	keys: string;
// }) {
// 	return (
// 		<li>
// 			<LinkPrimitive keys={`s ${keys}`} side="top" sideOffset={24} {...props}>
// 				{children}
// 			</LinkPrimitive>
// 		</li>
// 	);
// }

function Trigger({
	children,
	keys,
	...props
}: {
	children: React.ReactNode;
	keys: string;
}) {
	const { states } = useKey({
		keys,
	});

	return (
		<NavigationMenu.Trigger
			className={`${linkStyles.root} ${styles.trigger}`}
			data-pressed={states[0]}
			{...props}
		>
			<span>{children}</span>

			<kbd>[{keys}]</kbd>
		</NavigationMenu.Trigger>
	);
}

export function Footer({ children }: { children: React.ReactNode }) {
	return (
		<footer className={styles.root}>
			{children}

			<nav>
				{/* <NavigationMenu.List>
					<Social href="https://github.com/kngsthvs" keys="g">
            <Image
              alt="GitHub logo"
              height={24}
              src="/logos/github.svg"
              width={24}
            />

            <div style={visuallyHidden}>GitHub</div>
          </Social>

          <Social href="https://x.com/kngsthvs" keys="x">
            <Image alt="X logo" height={24} src="/logos/x.svg" width={24} />

            <div style={visuallyHidden}>X</div>
          </Social>

					<li>
						<kbd>[s]</kbd>
					</li>
				</NavigationMenu.List> */}

				<ul>
					{/* <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/strats" keys="s">
                Strategies
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/ops" keys="o">
                Operations
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/mans" keys="m">
                Manuals
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/docs" keys="d">
                Documentation
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item> */}

					<li>
						<p>
							Company <kbd>[c]</kbd>
						</p>

						<div className={styles.content}>
							<div>
								<p>About</p>
								<Item href="/hymn" keys="c h">
									Hymn
								</Item>
								{/* <Item href="/metrics" keys="c m">
                Metrics
              </Item>
              <Item href="security" keys="c s">
                Security
              </Item> */}
								<Item href="/vision" keys="c v">
									Vision
								</Item>
							</div>

							<div>
								<p>Legal</p>
								<Item href="/legal/dpa" keys="c d">
									DPA
								</Item>
								<Item href="/legal/privacy" keys="c p">
									Privacy Policy
								</Item>
								<Item href="/legal/terms" keys="c t">
									Terms of Service
								</Item>
							</div>
						</div>
					</li>

					<li>
						<Link href="/directory" keys="d">
							Directory
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
}
