import settings from "@/data/settings.json";
import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Balancer } from "@kngsthvs/ui/packages/balancer";
import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/link";
import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { type Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { VisuallyHidden } from "ui/components";
import { Button } from "ui/components/button";
import { App } from "./_components/app";
import { Aside } from "./_components/aside";
import backdropStyles from "./_components/backdrop.module.css";
import { App as AppProvider } from "./_components/context";
import { Header } from "./_components/header";
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
              quotes: {
                _title: true,
                items: {
                  _title: true,
                  content: { markdown: true },
                  justify: true,
                  source: true,
                },
              },
              sections: {
                _title: true,
                items: {
                  _title: true,
                  body: {
                    json: {
                      blocks: {
                        __typename: true,
                        _id: true,
                        href: true,
                        logo: { rawUrl: true },
                      },
                      content: true,
                    },
                  },
                  description: true,
                  id: true,
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
          const work = home.sections.items.find(({ id }) => id === "work");

          return (
            <>
              <div className={`dark ${styles.dark} ${styles.content}`}>
                <Header>
                  <Aside ticker>
                    <p>Ardens sed virens.</p>
                  </Aside>

                  <nav className={backdropStyles.root}>
                    <Link href="/">
                      <Image
                        alt="Kings & Thieves icon"
                        height={36}
                        src="/icon.svg"
                        width={36}
                      />

                      <VisuallyHidden>Kings & Thieves</VisuallyHidden>
                    </Link>

                    <ul>
                      {/* <Link href="/vision">Vision</Link>
                      <Link href="/residency">Residency</Link> */}
                    </ul>

                    <span>
                      <Button
                        href="mailto:contact@kngsthvs.com"
                        variant="secondary"
                      >
                        Contact us
                      </Button>

                      <Button href="/enter">Enter</Button>
                    </span>
                  </nav>

                  <section>
                    <Image
                      alt="Chi Rho"
                      height={512}
                      src="/chi-rho.svg"
                      width={512}
                    />

                    <Image
                      alt="Kings & Thieves logo"
                      height={80}
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
                      <App />
                      <App />
                      <App />
                      <App />
                      <App />
                      <App />
                    </ul>
                  </Aside>

                  {/* <Heading>{home.heading}</Heading> */}

                  <Section {...work}>
                    <div>
                      <div className={styles.work}>
                        <RichText
                          blocks={work?.body?.json.blocks}
                          components={{
                            PartnerComponent: (props) => (
                              <Partner
                                data-fill={Boolean(
                                  Number(work?.body?.json.blocks.length) % 2 ===
                                    1,
                                )}
                                href={props.href}
                                logo={props.logo}
                              />
                            ),
                          }}
                        >
                          {work?.body?.json.content}
                        </RichText>
                      </div>
                    </div>

                    <p style={{ maxWidth: "100%" }}>
                      <span>Have a project in mind? </span>

                      <LinkPrimitive href="/enter">
                        Apply to enter {"->"}
                      </LinkPrimitive>
                    </p>
                  </Section>

                  {/* <Section
                    {...home.sections.items.find(({ id }) => id === "pricing")}
                  >
                    <ul className={styles.prices}>
                      {prices.map((price) => (
                        <Price key={price.title} {...price} />
                      ))}
                    </ul>

                    <ul className={styles.features}>
                      {features.map((feature) => (
                        <Feature key={feature}>{feature}</Feature>
                      ))}
                    </ul>

                    <div className={styles.notes}>
                      {notes.map((note, index) => (
                        <Fragment key={note}>
                          <sub>
                            {Array.from(new Array(index + 1)).map(() => "†")}{" "}
                            {note}
                          </sub>

                          <br />
                        </Fragment>
                      ))}
                    </div>
                  </Section> */}

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
            </>
          );
        }}
      </Pump>
    </AppProvider>
  );
}
