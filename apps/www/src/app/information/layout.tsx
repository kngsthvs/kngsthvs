import { basehub } from "basehub";
import { Controls } from "ui/components/controls";
import { Footer } from "ui/components/footer";
import { Logo } from "../_components/logo";
import { Navigation } from "./_components/navigation";
import styles from "./layout.module.css";

export const revalidate = 60;

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { information } = await basehub({ next: { revalidate: 60 } }).query({
    __typename: true,
    information: {
      items: {
        _slug: true,
        _title: true,
        content: {
          json: { content: true },
        },
      },
    },
  });
  const links = [
    {
      href: "/information",
      name: "Cover",
    },
    ...information.items.map((item) => ({
      href: `/information/${item._slug}`,
      name: item._title,
    })),
    {
      href: "/information/end",
      name: "End",
    },
  ];

  return (
    <main className={styles.root}>
      <Logo>Information</Logo>

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
