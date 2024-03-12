import Image from "next/image";
import styles from "../page.module.css";

export default function Page() {
  return (
    <main className={`dark ${styles.root}`}>
      <p>Private beta</p>
      <Image
        alt="Kings & Thieves icon"
        height={60}
        src="/icon.svg"
        width={60}
      />
      /
      <Image
        alt="Crow’s Nest logo"
        height={30}
        src="/apps/crowsnest.svg"
        width={117}
      />
    </main>
  );
}
