"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { useKeyPress } from "react-use";
import linkStyles from "ui/components/link.module.css";
import { useKey } from "ui/hooks/use-key";
import { Link as LinkPrimitive } from "ui/primitives/link";
import styles from "./footer.module.css";

function Item({
  children,
  keys,
  ...props
}: {
  children: React.ReactNode;
  keys?: string;
} & React.ComponentProps<typeof NextLink>) {
  useKey({
    href: "href" in props ? String(props.href) : undefined,
    keys: keys ?? "",
  });
  const [pressed] = useKeyPress(keys?.at(-1));

  return (
    <NavigationMenu.Link asChild>
      <NextLink className={linkStyles.root} data-pressed={pressed} {...props}>
        <kbd>[{keys?.at(-1)}]</kbd>

        <span>{children}</span>
      </NextLink>
    </NavigationMenu.Link>
  );
}

function Social({
  children,
  keys,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  keys?: string;
}) {
  return (
    <li>
      <LinkPrimitive
        keys={`s ${keys}`}
        side="bottom"
        sideOffset={32}
        {...props}
      >
        {children}
      </LinkPrimitive>
    </li>
  );
}

function Trigger({
  children,
  keys,
  ...props
}: {
  children: React.ReactNode;
  keys: string;
}) {
  const { pressed } = useKey({
    keys: keys ?? "",
  });

  return (
    <NavigationMenu.Trigger
      className={`${linkStyles.root} ${styles.trigger}`}
      data-pressed={pressed}
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

      <NavigationMenu.Root delayDuration={0} skipDelayDuration={0}>
        <NavigationMenu.List>
          <Social href="https://github.com/kngsthvs" keys="g">
            <Image
              alt="GitHub logo"
              height={24}
              src="/logos/github.svg"
              width={24}
            />

            <VisuallyHidden.Root>GitHub</VisuallyHidden.Root>
          </Social>

          <Social href="https://x.com/kngsthvs" keys="x">
            <Image alt="X logo" height={24} src="/logos/x.svg" width={24} />

            <VisuallyHidden.Root>X</VisuallyHidden.Root>
          </Social>

          <li>
            <kbd>[s]</kbd>
          </li>
        </NavigationMenu.List>

        <NavigationMenu.List>
          {/* <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/ops" keys="o">
                Ops
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/docs" keys="d">
                Docs
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item> */}

          {/* <NavigationMenu.Item>
            <Trigger keys="l">Legal</Trigger>

            <NavigationMenu.Content className={styles.content} forceMount>
              <Item href="/legal/cookies" keys="l c">
                Cookie Policy
              </Item>

              <Item href="/legal/privacy" keys="l p">
                Privacy Policy
              </Item>

              <Item href="/legal/sub-processors" keys="l s">
                Sub-processors
              </Item>

              <Item href="/legal/terms" keys="l t">
                Terms of Service
              </Item>
            </NavigationMenu.Content>
          </NavigationMenu.Item> */}
        </NavigationMenu.List>
      </NavigationMenu.Root>

      <p className="mobile">Made for the glory of Christ.</p>
    </footer>
  );
}
