import Image from "next/image";
import styles from "../page.module.css";

export default function Page() {
  return (
    <main className={`dark ${styles.root}`}>
      <p>Private beta</p>

      <Image
        alt="Quarters logo"
        height={30}
        src="/apps/quarters.svg"
        width={100}
      />
    </main>
  );
}
