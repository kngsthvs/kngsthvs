import Link from "next/link";
import styles from "./section.module.css";

export function Section({
  children,
  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  title: string;
}) {
  return (
    <section className={styles.root} {...props}>
      <div>
        <h2>{props.title}</h2>

        <Link {...{ href }}>View all</Link>
      </div>

      {children}
    </section>
  );
}
