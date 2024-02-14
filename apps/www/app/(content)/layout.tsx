import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Balancer } from "@kngsthvs/ui/packages/balancer";
import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/Link";
import { basehub } from "basehub";
import { type Metadata } from "next";
import NextLink from "next/link";
import { VisuallyHidden } from "ui/components";
// @ts-expect-error ts(1479)
import ReactMarkdown from "react-markdown";
import { Button } from "ui/components/Button";
import { Aside } from "./_components/Aside";
import asideStyles from "./_components/Aside.module.css";
import backdropStyles from "./_components/Backdrop.module.css";
import { App } from "./_components/Context";
import { Header } from "./_components/Header";
import { Link } from "./_components/Link";
import styles from "./layout.module.css";

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
  const { settings } = await basehub({ next: { revalidate: 60 } }).query({
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
                {/* <Link href="/vision">Vision</Link>
                <Link href="/residency">Residency</Link> */}
              </ul>
            </span>

            <NextLink href="/">
              <img alt="Kings & Thieves icon" src="/icon.svg" />

              <VisuallyHidden>Kings & Thieves</VisuallyHidden>
            </NextLink>

            <span>
              <Button href="mailto:contact@kngsthvs.com" variant="secondary">
                Contact us
              </Button>

              <Button href="/enter">Enter</Button>
            </span>
          </nav>

          <section>
            <img alt="Chi Rho" src="/chi-rho.svg" />

            <NextLink href="/">
              <img alt="Kings & Thieves logo" src="word.svg" />

              <VisuallyHidden>Kings & Thieves</VisuallyHidden>
            </NextLink>
          </section>
        </Header>
      </div>

      <div className={styles.content}>
        <main className={styles.main}>
          <Aside>
            <p className="desktop">Made for the glory of Christ.</p>

            <ul className={`${styles.links} ${asideStyles.links}`}>
              {/* <Link href="https://crowsnest.kngsthvs.com">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.40109 20.5L5.62331 3.5H12H18.3767L14.5989 20.5H12H9.40109Z"
                    stroke="black"
                  />
                  <path
                    d="M6.36038 20.5L0.693713 3.5H23.3063L17.6396 20.5H6.36038Z"
                    stroke="black"
                  />
                  <path d="M12 4V20" stroke="black" />
                </svg>
              </Link> */}
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
                  <img alt="GitHub logo" src="/logos/github.svg" />

                  <VisuallyHidden>GitHub</VisuallyHidden>
                </Social>

                <Social href="https://x.com/kngsthvs">
                  <img alt="X logo" src="/logos/x.svg" />

                  <VisuallyHidden>X</VisuallyHidden>
                </Social>
              </ul>

              {/* <ul className={styles.links}>
                <Link href="/ops">Ops</Link>
                <Link href="/docs">Docs</Link>

                <li className={styles.external}>
                  <Link href="https://alongj.org">
                    <img alt="Along Journal logo" src="/logos/along.svg" />

                    <VisuallyHidden>Along</VisuallyHidden>
                  </Link>
                </li>
              </ul> */}
            </nav>

            <p className="mobile">Made for the glory of Christ.</p>
          </footer>
        </main>
      </div>
    </App>
  );
}
