import config from "@payload-config";
import { Controls } from "@repo/ui/components/controls";
import { Footer } from "@repo/ui/components/footer";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { Logo } from "../../_components/logo";
import { Navigation } from "./_components/navigation";
import styles from "./layout.module.css";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: "vision",
  });
  const slides = data.slides?.map((slide) => ({
    href: `/vision/${slide.id}`,
    name: slide.title,
  }));

  if (!slides) {
    return notFound();
  }

  const links = [
    {
      href: "/vision",
      name: "Cover",
    },
    ...slides,
    {
      href: "/vision/end",
      name: "End",
    },
  ].filter(Boolean);

  return (
    <main className={styles.root}>
      <Logo>Vision</Logo>

      <div className={styles.slides}>
        <article>{children}</article>

        <Navigation {...{ links }} />
      </div>

      <div>
        <Footer />

        <Controls />
      </div>
    </main>
  );
}
