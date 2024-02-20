import Image from "next/image";
import Link from "next/link";
import styles from "./app.module.css";

export function App({ path, name }: { path?: string; name?: string }) {
  return (
    <li className={styles.root}>
      {name ? (
        <Link href={`/${path}`}>
          <Image
            alt={`${name} icon`}
            height={48}
            src={`/apps/${path}.svg`}
            width={48}
          />
        </Link>
      ) : (
        <div />
      )}
    </li>
  );
}
