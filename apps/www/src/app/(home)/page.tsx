import settings from "@/data/settings.json";
import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Balancer } from "@kngsthvs/ui/packages/balancer";
import { Pump } from "basehub/react-pump";
import { type Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import { VisuallyHidden } from "ui/components";
import { Button } from "ui/components/button";
import { Link } from "ui/components/link";
import { App } from "./_components/app";
import { Aside } from "./_components/aside";
import backdropStyles from "./_components/backdrop.module.css";
import { App as AppProvider } from "./_components/context";
import { Header } from "./_components/header";
import headerStyles from "./_components/header.module.css";
import { Partner } from "./_components/partner";
import { Section } from "./_components/section";
import { Social } from "./_components/social";
import styles from "./page.module.css";

export const metadata: Metadata = {
  description: settings.description,
  title: settings.title,
};

export default function Page() {
  return (
    <AppProvider>
      <Pump
        draft={draftMode().isEnabled}
        next={{ revalidate: 60 }}
        queries={[
          {
            home: {
              __typename: true,
              _title: true,
              heading: true,
              partners: {
                _title: true,
                items: {
                  _title: true,
                  href: true,
                  logo: { rawUrl: true },
                },
              },
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
          },
        ]}
      >
        {async ([{ home }]) => {
          "use server"; // needs to be a Server Action

          const quote =
            home.quotes.items[
              Math.floor(Math.random() * home.quotes.items.length)
            ];
          const data = mapDataAttributes({ justify: quote?.justify });

          return (
            <>
              <div className={`dark ${styles.dark} ${styles.content}`}>
                <Header>
                  <Aside ticker>
                    <p>Ardens sed virens.</p>
                  </Aside>

                  <nav className={backdropStyles.root}>
                    <div>
                      <NextLink className={headerStyles.icon} href="/">
                        <Image
                          alt="Kings & Thieves icon"
                          height={36}
                          loading="eager"
                          priority
                          src="/icon.svg"
                          width={36}
                        />

                        <VisuallyHidden>Kings & Thieves</VisuallyHidden>
                      </NextLink>

                      <ul>
                        <Link href="/vision" keyName="v">
                          Vision
                        </Link>

                        {/* <Link href="/residency" keyName="r">
                        Residency
                      </Link> */}
                      </ul>
                    </div>

                    <span>
                      <Button
                        href="mailto:contact@kngsthvs.com"
                        keyName="c"
                        variant="secondary"
                      >
                        Contact us
                      </Button>

                      <Button href="/partner" keyName="p">
                        Partner
                      </Button>
                    </span>
                  </nav>

                  <section>
                    <Image
                      alt="Chi Rho"
                      height={512}
                      loading="eager"
                      src="/chi-rho.svg"
                      width={512}
                    />

                    <Image
                      alt="Kings & Thieves logo"
                      height={80}
                      loading="eager"
                      src="word.svg"
                      width={512}
                    />

                    <VisuallyHidden>Kings & Thieves</VisuallyHidden>
                  </section>
                </Header>
              </div>

              <div className={styles.content}>
                <main className={styles.main}>
                  <Aside>
                    <p className="desktop">Made for the glory of Christ.</p>

                    <ul className={`${styles.links} ${styles.rotate}`}>
                      <App name="Crow’s Nest" path="crowsnest" />
                      {/* <App />
                      <App />
                      <App />
                      <App />
                      <App />
                      <App /> */}
                    </ul>
                  </Aside>

                  <Section href="/partners" title="Partners">
                    <div className={styles.work}>
                      {home.partners.items.map((partner) => (
                        <Partner
                          data-fill={Boolean(
                            Number(home.partners.items.length) % 2 === 1,
                          )}
                          href={partner.href}
                          key={partner.href}
                          logo={partner.logo}
                        />
                      ))}
                    </div>
                  </Section>

                  <footer className={styles.footer}>
                    <blockquote {...data}>
                      <Balancer as="div">
                        <ReactMarkdown>
                          {quote?.content?.markdown}
                        </ReactMarkdown>

                        <footer>{quote?._title}</footer>
                      </Balancer>
                    </blockquote>

                    <nav>
                      <ul className="list">
                        <Social href="https://github.com/kngsthvs">
                          <Image
                            alt="GitHub logo"
                            height={24}
                            src="/logos/github.svg"
                            width={24}
                          />

                          <VisuallyHidden>GitHub</VisuallyHidden>
                        </Social>

                        <Social href="https://x.com/kngsthvs">
                          <Image
                            alt="X logo"
                            height={24}
                            src="/logos/x.svg"
                            width={24}
                          />

                          <VisuallyHidden>X</VisuallyHidden>
                        </Social>
                      </ul>

                      {/* <ul className={styles.links}>
                        <NextLink href="/ops">Ops</Link>
                        <NextLink href="/docs">Docs</Link>

                        <li className={styles.external}>
                          <NextLink href="https://alongj.org">
                            <img alt="Along Journal logo" src="/logos/along.svg" />

                            <VisuallyHidden>Along</VisuallyHidden>
                          </NextLink>
                        </li>
                      </ul> */}
                    </nav>

                    <p className="mobile">Made for the glory of Christ.</p>
                  </footer>
                </main>

                <nav>
                  <ul>
                    <li></li>
                  </ul>

                  <p>&copy; {new Date().getFullYear()} Kings & Thieves</p>
                </nav>
              </div>
            </>
          );
        }}
      </Pump>
    </AppProvider>
  );
}
