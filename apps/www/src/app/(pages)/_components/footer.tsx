"use client";

import { Link as LinkSharedPrimitive } from "@kngsthvs/ui/primitives/shared/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import React from "react";
import { useKeyPress } from "react-use";
import { Link } from "ui/components/link";
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
} & React.ComponentProps<typeof LinkSharedPrimitive>) {
  useKey({
    href: "href" in props ? String(props.href) : undefined,
    keys: keys ?? "",
  });
  const [pressed] = useKeyPress(keys?.at(-1));

  return (
    <NavigationMenu.Link asChild>
      <LinkSharedPrimitive
        className={linkStyles.root}
        data-pressed={pressed}
        {...props}
      >
        <kbd>[{keys?.at(-1)}]</kbd>

        <span>{children}</span>
      </LinkSharedPrimitive>
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
  keys: string;
}) {
  return (
    <li>
      <LinkPrimitive keys={`s ${keys}`} side="top" sideOffset={24} {...props}>
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

          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link href="/directory" keys="d">
                Directory
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Trigger keys="c">Company</Trigger>

            <NavigationMenu.Content className={styles.content} forceMount>
              <p>About</p>
              {/* <Item href="/metrics" keys="c m">
                Metrics
              </Item> */}
              <Item href="/investors" keys="c i">
                Investors
              </Item>
              {/* <Item href="security" keys="c s">
                Security
              </Item> */}
              <Item href="mailto:contact@kngsthvs.com" keys="c u">
                Contact us
              </Item>

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
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </footer>
  );
}
