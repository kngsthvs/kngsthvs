import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Balancer } from "@kngsthvs/ui/primitives/packages/balancer";
import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/Link";
import { basehub } from "basehub";
import { type Metadata } from "next";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import { VisuallyHidden } from "ui/components";
import { Button } from "ui/components/Button";
import { Aside } from "./Aside";
import backdropStyles from "./Backdrop.module.css";
import { App } from "./Context";
import { Header } from "./Header";
import { Link } from "./Link";
import styles from "./styles.module.css";

function Social({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <LinkPrimitive {...{ href }}>{children}</LinkPrimitive>
    </li>
  );
}

export const metadata: Metadata = {
  description:
    "“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
  title: "Kings & Thieves",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = await basehub().query({
    __typename: true,
    settings: {
      __typename: true,
      _title: true,
      quotes: {
        _title: true,
        items: {
          _title: true,
          content: { markdown: true },
          justify: true,
          source: true,
        },
      },
    },
  });

  const quote =
    settings.quotes.items[
      Math.floor(Math.random() * settings.quotes.items.length)
    ];
  const data = mapDataAttributes({ justify: quote?.justify });

  return (
    <App>
      <div className={`dark ${styles.dark} ${styles.content}`}>
        <Header>
          <Aside ticker>
            <p>Ardens sed virens.</p>
          </Aside>

          <nav className={backdropStyles.root}>
            <span>
              <ul>
                <Link href="/">Home</Link>
                {/* <Link href="/vision">Vision</Link> */}
              </ul>
            </span>

            <NextLink href="/">
              <img alt="Kings & Thieves icon" src="/&.svg" />

              <VisuallyHidden>Kings & Thieves</VisuallyHidden>
            </NextLink>

            <span>
              <Button href="/nest" variant="secondary">
                My account
              </Button>
              <Button href="mailto:contact@kngsthvs.com">Email us</Button>
            </span>
          </nav>

          <section>
            <img alt="Chi Rho" src="/chi-rho.svg" />

            <NextLink href="/">
              <img alt="Kings & Thieves logo" src="kngsthvs.svg" />

              <VisuallyHidden>Kings & Thieves</VisuallyHidden>
            </NextLink>
          </section>
        </Header>
      </div>

      <div className={styles.content}>
        <main className={styles.main}>
          <Aside>
            <p className="desktop">Made in Texas for the glory of Christ.</p>

            <ul className={styles.links}>
              {/* <Link href="/about">About</Link> */}
              <Link href="/crew" scroll>
                Crew
              </Link>
              {/* <Link href="/pricing">Pricing</Link>
              <Link href="/pricing">Work</Link> */}
            </ul>
          </Aside>

          {children}

          <footer className={styles.footer}>
            <blockquote {...data}>
              <Balancer as="div">
                <ReactMarkdown children={quote?.content?.markdown ?? ""} />

                <footer>{quote?._title}</footer>
              </Balancer>
            </blockquote>

            <nav>
              <ul className="list">
                <Social href="https://github.com/kngsthvs">
                  <img alt="GitHub logo" src="/github.svg" />

                  <VisuallyHidden>GitHub</VisuallyHidden>
                </Social>

                <Social href="https://x.com/kngsthvs">
                  <img alt="X logo" src="/x.svg" />

                  <VisuallyHidden>X</VisuallyHidden>
                </Social>
              </ul>

              <ul className={styles.links}>
                {/* <Link href="/books">Books</Link>
                <Link href="/docs">Docs</Link> */}

                {/* <li className={styles.external}>
                  <Link>
                    <img alt="Along Journal logo" src="/along.svg" />

                    <VisuallyHidden>Along</VisuallyHidden>
                  </Link>
                </li> */}
              </ul>
            </nav>

            <p className="mobile">Made in Texas for the glory of Christ.</p>
          </footer>
        </main>
      </div>
    </App>
  );
}
