"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "ui/components/button";
import styles from "./navigation.module.css";

export function Navigation({
  links,
}: {
  links: { href: string; name: string }[];
}) {
  const pathname = usePathname();
  const current = links.find((link) => link.href === pathname);
  const next =
    (current ? links[links.indexOf(current) + 1]?.href : links[0]?.href) ??
    "/information";
  const prev =
    (current ? links[links.indexOf(current) - 1]?.href : links[0]?.href) ??
    "/information";

  return (
    <nav className={styles.root}>
      <div>
        <Button
          disabled={pathname === links[0]?.href}
          href={prev}
          // keys="ArrowLeft"
          variant="tertiary"
        >
          &lt; Prev
        </Button>

        <hr />

        <Button
          disabled={pathname === links.at(-1)?.href}
          href={next}
          // keys="ArrowRight"
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
