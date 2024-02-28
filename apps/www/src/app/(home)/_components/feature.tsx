import { IoCheckmarkCircle } from "react-icons/io5";
import styles from "./feature.module.css";

export function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className={styles.root}>
      <IoCheckmarkCircle style={{ color: "var(--colors-primary)" }} />

      {children}
    </li>
  );
}
