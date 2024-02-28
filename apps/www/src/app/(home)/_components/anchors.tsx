import Link from "next/link";
import styles from "./anchors.module.css";
import backdropStyles from "./backdrop.module.css";

function Root({ children, ...props }: { children: React.ReactNode }) {
  return (
    <nav className={styles.root} {...props}>
      <ul className={backdropStyles.root}>{children}</ul>
    </nav>
  );
}

function Anchor({
  children,
  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li {...props}>
      <Link {...{ href }}>{children}</Link>
    </li>
  );
}

export const Anchors = Object.assign(Root, {
  Anchor,
});
