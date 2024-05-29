import Image from "next/image";
import { VisuallyHidden } from "ui/components";
import styles from "./cover.module.css";

export function Cover({ children }: { children?: React.ReactNode }) {
  return (
    <section className={styles.root}>
      <div>
        <Image
          alt="Chi Rho"
          height={512}
          loading="eager"
          priority
          src="/chi-rho.svg"
          width={512}
        />

        <Image
          alt="Kings & Thieves logo"
          height={80}
          loading="eager"
          src="/word.svg"
          width={512}
        />

        <VisuallyHidden>Kings & Thieves</VisuallyHidden>
      </div>

      {children}
    </section>
  );
}
