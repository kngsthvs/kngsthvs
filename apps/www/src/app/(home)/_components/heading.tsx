import { Balancer } from "@kngsthvs/ui/packages/balancer";
import Image from "next/image";
import styles from "./heading.module.css";

export function Heading({
  children,
  description,
}: {
  children: React.ReactNode;
  description?: React.ReactNode | string;
}) {
  return (
    <section className={styles.root}>
      <div>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
      </div>

      <Image alt="Chi Rho" height={80} priority src="/icon.svg" width={80} />

      <div className="">
        <h1>{children}</h1>

        <div className="">
          {Boolean(description) && <Balancer as="p">{description}</Balancer>}
        </div>
      </div>

      <div>
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
    </section>
  );
}
