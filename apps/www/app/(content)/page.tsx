import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/Link";
import { basehub } from "basehub";
import { Fragment } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import features from "../_data/features.json";
import notes from "../_data/notes.json";
import prices from "../_data/prices.json";
import projects from "../_data/projects.json";
import { Heading } from "./Heading";
import { Section } from "./Section";
import styles from "./styles.module.css";

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className={styles.feature}>
      <IoCheckmarkCircle style={{ color: "var(--colors-primary)" }} />

      {children}
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

function Project({ href, name }: { href: string; name: string }) {
  return (
    <div className={styles.project}>
      <LinkPrimitive {...{ href }}>
        <img
          alt={name}
          height={240}
          src={`/projects/${name.toLowerCase()}.svg`}
          width="100%"
        />
      </LinkPrimitive>
    </div>
  );
}

export default async function Page() {
  const { home } = await basehub().query({
    __typename: true,
    home: {
      __typename: true,
      _title: true,
      heading: true,
      sections: {
        _title: true,
        items: {
          _title: true,
          description: true,
          id: true,
        },
      },
    },
  });

  return (
    <>
      <Heading>{home.heading}</Heading>

      <Section {...home.sections.items.find(({ id }) => id === "work")}>
        <div className={styles.projects}>
          {projects.map((project, index) => (
            <Project key={project.name + index} {...project} />
          ))}
        </div>

        <p style={{ maxWidth: "100%" }}>
          <span>Have a project in mind? </span>

          <LinkPrimitive href="mailto:contact@kngsthvs.com">
            Send us an email {`->`}
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
