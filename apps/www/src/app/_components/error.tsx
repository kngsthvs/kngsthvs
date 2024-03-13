"use client";

import Image from "next/image";
import styles from "./error.module.css";

export function Error({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode | string;
}) {
  return (
    <section className={styles.root}>
      <Image alt="Chi Rho" height={80} priority src="/icon.svg" width={80} />

      <div className="">
        <h1>{title}</h1>

        <p>{children}</p>
      </div>
    </section>
  );
}
