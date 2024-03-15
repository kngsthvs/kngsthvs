import { Link } from "ui/primitives/link";
import styles from "./section.module.css";

export function Section({
  children,
  href,
  keys,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  keys?: string;
  title: string;
}) {
  return (
    <section className={styles.root} {...props}>
      <div>
        <h2>{props.title}</h2>

        <Link className="link" keys={`shift+${keys}`} {...{ href }}>
          <span>View all</span>

          {keys ? <kbd>[{keys}]</kbd> : null}
        </Link>
      </div>

      {children}
    </section>
  );
}
