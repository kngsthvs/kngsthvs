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
  const { investors } = await basehub({ next: { revalidate: 60 } }).query({
    __typename: true,
    investors: {
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
      href: "/investors",
      name: "Cover",
    },
    ...investors.items.map((item) => ({
      href: `/investors/${item._slug}`,
      name: item._title,
    })),
    {
      href: "/investors/contact",
      name: "Contact",
    },
  ];

  return (
    <main className={styles.root}>
      <Logo>Investors</Logo>

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
