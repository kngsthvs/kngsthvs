"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "ui/components/button";
import styles from "./navigation.module.css";

export function Navigation({
  links,
}: {
  links: { href: string; name: string }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const current = links.find((link) => link.href === pathname);

  return (
    <nav className={styles.root}>
      <div>
        <Button
          disabled={pathname === links[0]?.href}
          onClick={() => {
            if (!current) {
              return;
            }

            const link = links[links.indexOf(current) - 1]?.href;

            if (!link) {
              return;
            }

            router.push(link);
          }}
          variant="tertiary"
        >
          &lt; Prev
        </Button>

        <hr />

        <Button
          disabled={pathname === links.at(-1)?.href}
          onClick={() => {
            if (!current) {
              return;
            }

            const link = links[links.indexOf(current) + 1]?.href;

            if (!link) {
              return;
            }

            router.push(link);
          }}
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
