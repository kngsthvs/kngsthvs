import Link from "next/link";
import styles from "./Anchors.module.css";
import backdropStyles from "./Backdrop.module.css";

function Root({ children, ...props }) {
  return (
    <nav className={styles.root} {...props}>
      <ul className={backdropStyles.root}>{children}</ul>
    </nav>
  );
}

function Anchor({ children, href, ...props }) {
  return (
    <li {...props}>
      <Link {...{ href }}>{children}</Link>
    </li>
  );
}

export const Anchors = Object.assign(Root, {
  Anchor,
});
