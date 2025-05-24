import NextLink, { type LinkProps as InternalLinkProps } from "next/link";
import type React from "react";

export type LinkProps =
	| InternalLinkProps
	| React.AnchorHTMLAttributes<HTMLAnchorElement>
	| React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Link(props: LinkProps) {
	if (props && "href" in props) {
		if (
			typeof props.href === "string" &&
			(props.href.includes("://") || props?.href.includes("."))
		) {
			return (
				<a
					rel="noreferrer"
					target="_blank"
					{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				/>
			);
		} else {
			return <NextLink {...(props as InternalLinkProps)} />;
		}
	}

	return (
		<button
			{...{
				type: "button",
				...(props as React.ButtonHTMLAttributes<HTMLButtonElement>),
			}}
		/>
	);
}
