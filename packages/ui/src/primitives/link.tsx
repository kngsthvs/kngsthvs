"use client";

import { Tooltip } from "@base-ui-components/react/tooltip";
import {
  Link as LinkPrimitive,
  type LinkProps,
} from "@kngsthvs/ui/primitives/shared/link";
import { useRef } from "react";
import { useKey } from "../hooks/use-key";

function SingleKey(
  props: LinkProps &
    React.PropsWithChildren<{
      keys?: string;
    }>,
) {
  const { states } = useKey({
    href: "href" in props ? String(props.href) : undefined,
    keys: props.keys ?? "",
  });

  return (
    <LinkPrimitive data-pressed={states[0]} {...props}>
      <span>{props.children}</span>

      {props.keys ? <kbd>[{props.keys}]</kbd> : null}
    </LinkPrimitive>
  );
}

interface TooltipProps {
  side?: React.ComponentProps<typeof Tooltip.Positioner>["side"];
  sideOffset?: React.ComponentProps<typeof Tooltip.Positioner>["sideOffset"];
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
  const ref = useRef<HTMLAnchorElement>(null);

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
      <Tooltip.Root open={states[0]}>
        <Tooltip.Trigger
          data-first={states[0]}
          data-pressed={every}
          render={(renderProps) => (
            <LinkPrimitive {...{ ...renderProps, ...props }} />
          )}
          {...{ ref }}
        >
          <span>{props.children}</span>
        </Tooltip.Trigger>

        <Tooltip.Portal container={ref}>
          <Tooltip.Positioner {...{ side, sideOffset }}>
            <Tooltip.Popup aria-label={keys}>
              <kbd
                style={{
                  opacity: states[0] ? "1" : "0",
                }}
              >
                [{keys.at(-1)}]
              </kbd>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
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
