import { Cover } from "../../_components/cover";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.root}>
      <Cover />
    </div>
  );
}
