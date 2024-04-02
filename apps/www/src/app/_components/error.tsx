"use client";

import { useKeys } from "@kngsthvs/ui/functions/client/context/keys";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./error.module.css";

export function Error({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode | string;
}) {
  const router = useRouter();

  useKeys("b", () => {
    router.back();
  });
  useKeys("f", () => {
    router.forward();
  });
  useKeys("h", () => {
    router.push("/");
  });

  return (
    <section className={styles.root}>
      <Link href="/">
        <Image alt="Chi Rho" height={80} priority src="/icon.svg" width={80} />
      </Link>

      <div className="">
        <h1>{title}</h1>

        <p>{children}</p>
      </div>
    </section>
  );
}
