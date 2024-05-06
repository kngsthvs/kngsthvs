"use client";

import { Link } from "@kngsthvs/ui/primitives/shared/link";
import { useKey } from "ui/hooks/use-key";
import styles from "./section.module.css";

export function Section({
  children,
  href,
  keys,
  ...props
}: {
  children: React.ReactNode;
  href?: string;
  keys?: string;
  title: string;
}) {
  const { states } = keys
    ? useKey({ href, keys: `Shift+${keys}` })
    : { states: [false] };

  return (
    <section className={styles.root} {...props}>
      <div>
        <h2>{props.title}</h2>

        {href ? (
          <Link className="link" data-pressed={states[0]} {...{ href }}>
            <span>View all</span>

            {keys ? <kbd>[&#8679;+{keys?.toLocaleUpperCase()}]</kbd> : null}
          </Link>
        ) : null}
      </div>

      {children}
    </section>
  );
}
