import { basehub } from "basehub";
import { Controls } from "ui/components/controls";
import { Footer } from "ui/components/footer";
import { Logo } from "../_components/logo";
import styles from "./layout.module.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <main className={styles.root}>
      <Logo>Investors</Logo>

      <div className={styles.slides}>
        <article>{children}</article>

        <nav>
          <ul>
            {investors.items.map((investor) => (
              <li key={investor._slug}>
                <a href={`/investors/${investor._slug}`}>{investor._title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <Footer />

        <Controls />
      </div>
    </main>
  );
}
