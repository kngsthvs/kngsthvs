import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Balancer } from "@kngsthvs/ui/packages/balancer";
import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/link";
import { basehub } from "basehub";
import { RichText } from "basehub/react";
import { type Metadata } from "next";
import Image from "next/image";
import { default as NextLink } from "next/link";
import { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { VisuallyHidden } from "ui/components";
import { Button } from "ui/components/button";
import { App } from "./_components/app";
import { Aside } from "./_components/aside";
import asideStyles from "./_components/aside.module.css";
import backdropStyles from "./_components/backdrop.module.css";
import { App as AppProvider } from "./_components/context";
import { Feature } from "./_components/feature";
import { Header } from "./_components/header";
import { Partner } from "./_components/partner";
import { Price } from "./_components/price";
import { Section } from "./_components/section";
import { Social } from "./_components/social";
import features from "./_data/features.json";
import notes from "./_data/notes.json";
import prices from "./_data/prices.json";
import layoutStyles from "./layout.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  description:
    "“There is nothing on this earth more to be prized than true friendship.” — St. Thomas Aquinas",
  title: "Kings & Thieves",
};

export default async function Page() {
  const { home, settings } = await basehub({ next: { revalidate: 60 } }).query({
    __typename: true,
    home: {
      __typename: true,
      _title: true,
      heading: true,
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
  const work = home.sections.items.find(({ id }) => id === "work");

  return (
    <AppProvider>
      <div className={`dark ${layoutStyles.dark} ${layoutStyles.content}`}>
        <Header>
          <Aside ticker>
            <p>Ardens sed virens.</p>
          </Aside>

          <nav className={backdropStyles.root}>
            <NextLink href="/">
              <Image
                alt="Kings & Thieves icon"
                height={36}
                src="/icon.svg"
                width={36}
              />

              <VisuallyHidden>Kings & Thieves</VisuallyHidden>
            </NextLink>

            <ul>
              {/* <Link href="/vision">Vision</Link>
              <Link href="/residency">Residency</Link> */}
            </ul>

            <span>
              <Button href="mailto:contact@kngsthvs.com" variant="secondary">
                Contact us
              </Button>

              <Button href="/enter">Enter</Button>
            </span>
          </nav>

          <section>
            <Image alt="Chi Rho" height={512} src="/chi-rho.svg" width={512} />

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

      <div className={layoutStyles.content}>
        <main className={layoutStyles.main}>
          <Aside>
            <p className="desktop">Made for the glory of Christ.</p>

            <ul className={`${layoutStyles.links} ${asideStyles.links}`}>
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

          {/* <Heading>{home.heading}</Heading> */}

          <Section {...work}>
            <div>
              <div className={styles.work}>
                {/* @ts-expect-error ts(2786) */}
                <RichText
                  blocks={work?.body?.json.blocks}
                  components={{
                    PartnerComponent: (props) => (
                      <Partner
                        data-fill={Boolean(
                          Number(work?.body?.json.blocks.length) % 2 === 1,
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

              <ul className={styles.apps}>
                <App name="Crow’s Nest" path="crowsnest" />
                <App />
                <App />
                <App />
                <App />
                <App />
                <App />
              </ul>
            </div>

            <p style={{ maxWidth: "100%" }}>
              <span>Have a project in mind? </span>

              <LinkPrimitive href="/enter">Apply to enter {"->"}</LinkPrimitive>
            </p>
          </Section>

          <Section {...home.sections.items.find(({ id }) => id === "pricing")}>
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
                    {Array.from(new Array(index + 1)).map(() => "†")} {note}
                  </sub>

                  <br />
                </Fragment>
              ))}
            </div>
          </Section>

          <footer className={layoutStyles.footer}>
            <blockquote {...data}>
              <Balancer as="div">
                <ReactMarkdown>{quote?.content?.markdown}</ReactMarkdown>

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

              {/* <ul className={layoutStyles.links}>
                <Link href="/ops">Ops</Link>
                <Link href="/docs">Docs</Link>

                <li className={layoutStyles.external}>
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
    </AppProvider>
  );
}
