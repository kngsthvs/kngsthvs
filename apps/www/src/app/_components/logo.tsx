import Image from "next/image";
import Link from "next/link";
import styles from "./logo.module.css";

export function Logo({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Link href="/">
        <Image alt="Chi Rho" height={80} priority src="/icon.svg" width={80} />
      </Link>

      <span>/</span>

      <h1>{children}</h1>
    </div>
  );
}
