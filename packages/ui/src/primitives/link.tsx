"use client";

import {
  Link as LinkPrimitive,
  type LinkProps,
  type LinkType,
} from "@kngsthvs/ui/primitives/shared/link";
import * as Tooltip from "@radix-ui/react-tooltip";
import { forwardRef } from "react";
import { useKey } from "../hooks/use-key";

const SingleKey = forwardRef<
  LinkType,
  LinkProps &
    React.PropsWithChildren<{
      keys?: string;
    }>
>((props, ref) => {
  const { states } = useKey({
    href: "href" in props ? String(props.href) : undefined,
    keys: props.keys ?? "",
  });

  return (
    <LinkPrimitive data-pressed={states[0]} {...{ ref, ...props }}>
      <span>{props.children}</span>

      {props.keys ? <kbd>[{props.keys}]</kbd> : null}
    </LinkPrimitive>
  );
});

SingleKey.displayName = "Link";

interface TooltipProps {
  side?: React.ComponentProps<typeof Tooltip.Content>["side"];
  sideOffset?: React.ComponentProps<typeof Tooltip.Content>["sideOffset"];
}
function MultipleKeys({
  side,
  sideOffset,
  ...props
}: LinkProps &
  React.PropsWithChildren<
    {
      keys: string;
    } & TooltipProps
  >) {
  const { every, states } = useKey({
    href: "href" in props ? String(props.href) : undefined,
    keys: props.keys ?? "",
  });

  // Show uppercase key if Shift is included in keys
  if (props.keys.includes("Shift") && !props.keys.includes("+")) {
    return (
      <LinkPrimitive data-first={states[0]} data-pressed={every} {...props}>
        <span>{props.children}</span>

        {props.keys ? (
          <kbd>
            [
            {String(
              props.keys.slice(props.keys.indexOf("+") + 1),
            ).toLocaleUpperCase()}
            ]
          </kbd>
        ) : null}
      </LinkPrimitive>
    );
  }

  const keys =
    props.keys.includes(" ") || props.keys.includes("+")
      ? props.keys.slice(props.keys.indexOf(" ") + 1)
      : props.keys.slice(props.keys.indexOf("+") + 1);

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <LinkPrimitive data-first={states[0]} data-pressed={every} {...props}>
            <span>{props.children}</span>
          </LinkPrimitive>
        </Tooltip.Trigger>

        <Tooltip.Content aria-label={keys} forceMount {...{ side, sideOffset }}>
          <kbd
            style={{
              opacity: states[0] ? "1" : "0",
            }}
          >
            [{keys.at(-1)}]
          </kbd>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function Link({
  children,
  keys,
  ...props
}: LinkProps &
  React.PropsWithChildren<
    {
      keys: string;
    } & TooltipProps
  >) {
  if (keys.length > 1) {
    return <MultipleKeys {...{ keys, ...props }}>{children}</MultipleKeys>;
  }

  return <SingleKey {...{ keys, ...props }}>{children}</SingleKey>;
}
