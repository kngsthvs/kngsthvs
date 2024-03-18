import settings from "@/data/settings.json";
import { shuffle } from "@kngsthvs/lib/entropy/shuffle";
import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Balancer } from "@kngsthvs/ui/packages/balancer";
import { Pump } from "basehub/react-pump";
import { type Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { VisuallyHidden } from "ui/components";
import { Button } from "ui/components/button";
import { Link } from "ui/components/link";
import { Link as LinkPrimitive } from "ui/primitives/link";
import { App } from "./_components/app";
import { Aside } from "./_components/aside";
import backdropStyles from "./_components/backdrop.module.css";
import { App as AppProvider } from "./_components/context";
import { Controls } from "./_components/controls";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import headerStyles from "./_components/header.module.css";
import { Partner } from "./_components/partner";
import { Section } from "./_components/section";
import { Whispers } from "./_components/whispers";
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
              whispers: {
                _title: true,
                items: {
                  _title: true,
                  whisper: true,
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
          const whispers = shuffle<string>(
            home.whispers.items.map(({ whisper }) => whisper),
          );

          return (
            <>
              <div className={`dark ${styles.dark} ${styles.content}`}>
                <Header>
                  <Aside ticker>
                    <p>Ardens sed virens.</p>
                  </Aside>

                  <nav className={backdropStyles.root}>
                    <div>
                      <LinkPrimitive
                        className={headerStyles.icon}
                        href="/"
                        keys="h"
                      >
                        <Image
                          alt="Kings & Thieves icon"
                          height={32}
                          loading="eager"
                          src="/icon.svg"
                          width={32}
                        />

                        <VisuallyHidden>Kings & Thieves</VisuallyHidden>
                      </LinkPrimitive>

                      <ul>
                        <li>
                          <Link href="/vision" keys="v">
                            Vision
                          </Link>
                        </li>

                        {/* <li>
                          <Link href="/residency" keys="r">
                            Residency
                          </Link>
                        </li> */}
                      </ul>
                    </div>

                    <span>
                      <Button
                        href="mailto:contact@kngsthvs.com"
                        keys="c"
                        variant="secondary"
                      >
                        Contact us
                      </Button>

                      <Button href="/partner" keys="p">
                        Partner
                      </Button>
                    </span>
                  </nav>

                  <section>
                    <div>
                      <Image
                        alt="Chi Rho"
                        height={512}
                        loading="eager"
                        priority
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
                    </div>

                    {whispers ? <Whispers {...{ whispers }} /> : null}
                  </section>
                </Header>
              </div>

              <div className={styles.content}>
                <main className={styles.main}>
                  <Aside>
                    <p className="desktop">Made for the glory of Christ.</p>

                    <div>
                      <ul className={`${styles.links} ${styles.rotate}`}>
                        <App name="Crow’s Nest" path="crowsnest" />
                        {/* <App />
                        <App />
                        <App />
                        <App />
                        <App />
                        <App /> */}
                      </ul>

                      <kbd>[a]</kbd>
                    </div>
                  </Aside>

                  <Section href="/partners" keys="p" title="Partners">
                    <ul className={styles.work}>
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
                    </ul>
                  </Section>

                  <Footer>
                    <blockquote {...data}>
                      <Balancer as="div">
                        <ReactMarkdown>
                          {quote?.content?.markdown}
                        </ReactMarkdown>

                        <footer>{quote?._title}</footer>
                      </Balancer>
                    </blockquote>
                  </Footer>
                </main>

                <nav>
                  <ul className={styles.links}>
                    <li className={styles.external}>
                      {/* <NextLink href="https://alongj.org">
                          <img alt="Along Journal logo" src="/logos/along.svg" />

                          <VisuallyHidden>Along</VisuallyHidden>
                        </NextLink> */}
                    </li>
                  </ul>

                  <Controls />
                </nav>
              </div>
            </>
          );
        }}
      </Pump>
    </AppProvider>
  );
}
