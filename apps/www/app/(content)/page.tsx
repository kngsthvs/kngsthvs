import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/Link";
import { basehub } from "basehub";
import { RichText } from "basehub/react";
import Link from "next/link";
import { Fragment } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import features from "../_data/features.json";
import notes from "../_data/notes.json";
import prices from "../_data/prices.json";
import { Section } from "./_components/Section";
import styles from "./page.module.css";

function App({ path, name }: { path?: string; name?: string }) {
  return (
    <li className={styles.app}>
      {name ? (
        <Link href={`/${path}`}>
          <img
            alt={`${name} icon`}
            height={48}
            src={`/apps/${path}.svg`}
            width={48}
          />
        </Link>
      ) : (
        <div />
      )}
    </li>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className={styles.feature}>
      <IoCheckmarkCircle style={{ color: "var(--colors-primary)" }} />

      {children}
    </li>
  );
}

function Partner({
  href,
  logo,
  ...props
}: {
  href: string | null;
  logo: { alt?: string | null; rawUrl: string } | null;
}) {
  return (
    <li className={styles.partner} {...props}>
      {href && logo?.rawUrl ? (
        <LinkPrimitive {...{ href }}>
          <img
            alt={logo.alt ?? "logo"}
            height={240}
            src={logo.rawUrl}
            width="100%"
          />
        </LinkPrimitive>
      ) : (
        <div />
      )}
    </li>
  );
}

function Price({
  description,
  title,
}: {
  description?: string;
  title?: string;
}) {
  return (
    <li className={styles.price}>
      <h3>{title}</h3>

      <h4>
        & ${description} per month<sup>††</sup>
      </h4>
    </li>
  );
}

export default async function Page() {
  const { home } = await basehub({ next: { revalidate: 60 } }).query({
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
              content: true,
              blocks: {
                __typename: true,
                _id: true,
                href: true,
                logo: { rawUrl: true },
              },
            },
          },
          description: true,
          id: true,
        },
      },
    },
  });

  const work = home.sections.items.find(({ id }) => id === "work");

  return (
    <>
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
                    data-fill={
                      Number(work?.body?.json.blocks.length) % 2 === 1
                        ? true
                        : false
                    }
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
            <App path="crowsnest" name="Crow’s Nest" />
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

          <LinkPrimitive href="mailto:contact@kngsthvs.com">
            Apply to enter {`->`}
          </LinkPrimitive>
        </p>
      </Section>

      <Section {...home.sections.items.find(({ id }) => id === "pricing")}>
        <ul className={styles.prices}>
          {prices.map((price, index) => (
            <Price key={price.title + index} {...price} />
          ))}
        </ul>

        <ul className={styles.features}>
          {features.map((feature, index) => (
            <Feature key={feature + index}>{feature}</Feature>
          ))}
        </ul>

        <div className={styles.notes}>
          {notes.map((note, index) => (
            <Fragment key={note + index}>
              <sub>
                {Array.from(new Array(index + 1)).map(() => "†")} {note}
              </sub>

              <br />
            </Fragment>
          ))}
        </div>
      </Section>
    </>
  );
}
