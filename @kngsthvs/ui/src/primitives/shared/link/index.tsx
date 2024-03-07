import NextLink, { type LinkProps as InternalLinkProps } from "next/link";
import React, { forwardRef } from "react";

export type LinkProps =
  | InternalLinkProps
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
  | React.ButtonHTMLAttributes<HTMLButtonElement>;
export type LinkType = HTMLAnchorElement & HTMLButtonElement;

export const Link = forwardRef<LinkType, LinkProps>((props, ref) => {
  if (props && "href" in props) {
    if (
      typeof props.href === "string" &&
      (props.href.includes("://") || props?.href.includes("."))
    ) {
      return (
        <a
          rel="noreferrer"
          target="_blank"
          {...{
            ref,
            ...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>),
          }}
        />
      );
    } else {
      return (
        <NextLink
          {...{
            ref,
            ...(props as InternalLinkProps),
          }}
        />
      );
    }
  }

  return (
    <button
      {...{
        ref,
        type: "button",
        ...(props as React.ButtonHTMLAttributes<HTMLButtonElement>),
      }}
    />
  );
});

Link.displayName = "Link";
