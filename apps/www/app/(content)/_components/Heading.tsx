import { Balancer } from "@kngsthvs/ui/packages/balancer";
import styles from "./Heading.module.css";

export function Heading({ children }: { children: React.ReactNode }) {
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

      <Balancer as="h1">{children}</Balancer>

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
