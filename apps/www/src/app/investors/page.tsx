import { Cover } from "../_components/cover";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.root}>
      <p>New ETA is 12:00, I spent more time writing this than I expected.</p>

      <Cover />
    </div>
  );
}
