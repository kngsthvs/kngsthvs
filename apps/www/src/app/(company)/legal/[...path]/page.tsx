import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Balancer } from "react-wrap-balancer";
import pages from "@/content/pages.json";
import styles from "./page.module.css";

export const metadata: Metadata = {
	description: pages.description,
	title: pages.title,
};

export default async function Page(props: {
	params: Promise<{ path: string[] }>;
}) {
	return (
		<Pump
			draft={(await draftMode()).isEnabled}
			next={{ revalidate: 60 }}
			queries={[
				{
					legal: {
						__args: {
							filter: {
								_sys_slug: { eq: (await props.params).path.at(-1) },
							},
						},
						_title: true,
						items: {
							_title: true,
							content: {
								json: {
									content: true,
								},
							},
							updated: true,
						},
					},
				},
			]}
		>
			{async ([{ legal }]) => {
				"use server"; // Needs to be a Server Action

				const updated = new Date(String(legal.items[0]?.updated));

				if (legal.items.length === 0) {
					notFound();
				}

				return (
					<div className={styles.root}>
						<article>
							{typeof legal.items[0]?.updated === "string" ? (
								<p>
									Last updated:{" "}
									{updated.toLocaleDateString("en-US", {
										day: "numeric",
										month: "long",
										year: "numeric",
									})}
								</p>
							) : null}

							<h1>{legal.items[0]?._title}</h1>

							<RichText
								components={{
									h2: ({ children, ...props }) => (
										<h2>
											<Balancer {...props}>{children}</Balancer>
										</h2>
									),
									h3: ({ children, ...props }) => (
										<h3>
											<Balancer {...props}>{children}</Balancer>
										</h3>
									),
									h4: ({ children, ...props }) => (
										<h4>
											<Balancer {...props}>{children}</Balancer>
										</h4>
									),
									h5: ({ children, ...props }) => (
										<h5>
											<Balancer {...props}>{children}</Balancer>
										</h5>
									),
									h6: ({ children, ...props }) => (
										<h6>
											<Balancer {...props}>{children}</Balancer>
										</h6>
									),
								}}
							>
								{legal.items[0]?.content?.json.content}
							</RichText>
						</article>
					</div>
				);
			}}
		</Pump>
	);
}
