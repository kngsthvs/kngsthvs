import { getTheme } from "@kngsthvs/ui/functions/server/theme";
import { ReactFlowProvider } from "@xyflow/react";
import Image from "next/image";
import Link from "next/link";
import { Controls } from "ui/components/controls";
import { Footer } from "ui/components/footer";
import { Flow } from "./_components/flow";
import styles from "./page.module.css";

export default async function Page() {
  const { colorScheme } = await getTheme();

  return (
    <section className={styles.root}>
      <div>
        <Link href="/">
          <Image
            alt="Chi Rho"
            height={80}
            priority
            src="/icon.svg"
            width={80}
          />
        </Link>

        <span>/</span>

        <h1>Directory</h1>
      </div>

      <ReactFlowProvider>
        <Flow {...{ colorScheme }} />
      </ReactFlowProvider>

      <div>
        <Footer />

        <Controls />
      </div>
    </section>
  );
}
