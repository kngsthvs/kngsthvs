import Image from "next/image";
import styles from "../page.module.css";

export default function Page() {
  return (
    <div className={styles.root}>
      <p>Private beta</p>

      <Image
        alt="Crow’s Nest logo"
        height={30}
        src="/apps/crowsnest.svg"
        width={117}
      />
    </div>
  );
}
