"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import styles from "./error.module.css";

export function Error({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode | string;
}) {
  const router = useRouter();

  useHotkeys("h", () => {
    router.push("/");
  });

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
