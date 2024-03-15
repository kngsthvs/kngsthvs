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
  const { pressed } = useKey({
    href: "href" in props ? String(props.href) : undefined,
    keys: props.keys ?? "",
  });

  return (
    <LinkPrimitive data-pressed={pressed} {...{ ref, ...props }}>
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
      keys: string | string[];
    } & TooltipProps
  >) {
  const { pressed } = useKey({
    href: "href" in props ? String(props.href) : undefined,
    keys: props.keys ?? "",
  });

  // Show uppercase key if Shift is included in keys
  if (props.keys.includes("Shift")) {
    return (
      <LinkPrimitive data-pressed={pressed} {...props}>
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

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <LinkPrimitive data-pressed={pressed} {...props}>
            <span>{props.children}</span>
          </LinkPrimitive>
        </Tooltip.Trigger>

        <Tooltip.Content forceMount {...{ side, sideOffset }}>
          {props.keys && Array.isArray(props.keys) ? (
            <kbd
              style={{
                opacity: pressed ? "1" : "0",
              }}
            >
              [{props.keys.slice(1).join("+")}]
            </kbd>
          ) : (
            <kbd
              style={{
                opacity: pressed ? "1" : "0",
              }}
            >
              [
              {props.keys.includes(" ")
                ? props.keys.slice(props.keys.indexOf(" ") + 1)
                : props.keys.slice(props.keys.indexOf("+") + 1)}
              ]
            </kbd>
          )}
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
      keys?: string | string[];
    } & TooltipProps
  >) {
  if (keys?.includes(" ") || keys?.includes("+") || Array.isArray(keys)) {
    return <MultipleKeys {...{ keys, ...props }}>{children}</MultipleKeys>;
  }

  return <SingleKey {...{ keys, ...props }}>{children}</SingleKey>;
}
