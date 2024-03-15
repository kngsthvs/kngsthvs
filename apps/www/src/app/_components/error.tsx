"use client";

import { tinykeys } from "@kngsthvs/ui/packages/tinykeys";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./error.module.css";

export function Error({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode | string;
}) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = tinykeys(window, {
      b: () => {
        router.back();
      },
      f: () => {
        router.forward();
      },
      h: () => {
        router.push("/");
      },
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

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
