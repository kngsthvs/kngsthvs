import { Controls } from "ui/components/controls";
import { Footer } from "ui/components/footer";
import { Logo } from "../_components/logo";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.root}>
      <Logo>Directory</Logo>

      {children}

      <div>
        <Footer />

        <Controls />
      </div>
    </main>
  );
}
