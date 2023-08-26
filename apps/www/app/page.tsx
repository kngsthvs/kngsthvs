import { IoCheckmarkCircle, IoGlobeOutline } from "react-icons/io5";
import { Button } from "ui/components";
import { VisuallyHidden } from "ui/components/client";
import { Balancer, Link } from "ui/primitives";
import creators from "./_data/creators.json";
import features from "./_data/features.json";
import notes from "./_data/notes.json";
import prices from "./_data/prices.json";
import projects from "./_data/projects.json";
import sections from "./_data/sections.json";
import styles from "./styles.module.css";

function Creator({ calendar, email, name, role, website, x }) {
  return (
    <li className={styles.creator}>
      <span>
        {name && <h3>{name}</h3>}

        {role && <p>{role}</p>}
      </span>

      <span>
        {website && (
          <Link href={website}>
            <IoGlobeOutline />

            <VisuallyHidden>Website</VisuallyHidden>
          </Link>
        )}

        {x && (
          <Link href={`https://x.com/${x}`}>
            <img alt="X logo" src="/x.svg" />

            <VisuallyHidden>X</VisuallyHidden>
          </Link>
        )}

        <Button href={`mailto:${email}`}>Send an email</Button>

        {/* <Button href={calendar}>
          Schedule a call
        </Button> */}
      </span>
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

const tools = [
  { file: "next", href: "https://nextjs.org/", name: "Next.js" },
  { file: "strapi", href: "https://strapi.io/", name: "Strapi" },
  { file: "svelte", href: "https://svelte.dev/", name: "Svelte" },
  { file: "three", href: "https://threejs.org/", name: "Three.js" },
  { file: "tina", href: "https://tina.io/", name: "Tina" },
  { file: "turbo", href: "https://turbo.build/", name: "Turbo" },
  { file: "vercel", href: "https://vercel.com/", name: "Vercel" },
];

function Project({
  href,
  name,
  using,
}: {
  href: string;
  name: string;
  using?: string[];
}) {
  return (
    <div className={styles.project}>
      <Link {...{ href }}>
        <img
          alt={name}
          height={40}
          src={`/projects/${name.toLowerCase()}.svg`}
          width="100%"
        />
      </Link>

      {using && using.length > 0 && (
        <div className={styles.tools}>
          <p>Built with</p>

          <ul>
            {tools.map(
              ({ file, href, name }, index) =>
                using.includes(file) && (
                  <li key={name + index}>
                    <Link href={href}>
                      <img alt={`${name} logo`} src={`/tools/${file}.svg`} />

                      <VisuallyHidden>{name}</VisuallyHidden>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

const Section = Object.assign(
  ({
    children,
    description,
    title,
  }: {
    children: React.ReactNode;
    description?: string;
    title?: string;
  }) => (
    <section className={styles.section}>
      {title && <h2 id={title.toLowerCase().split(" ").join("-")}>{title}</h2>}

      {description && <p>{description}</p>}

      {children}
    </section>
  ),
  {}
);

export default async function Page() {
  return (
    <>
      <section className={styles.section}>
        <Balancer as="h1">Kings & Thieves is building a holy culture.</Balancer>
      </section>

      <Section {...sections.work}>
        <ul className={styles.projects}>
          {projects.map((project, index) => (
            <li>
              <Project key={project.name + index} {...project} />
            </li>
          ))}
        </ul>

        <p>
          <span>Want to work together? </span>
          <Link href="mailto:contact@kngsthvs.com">Send us an email →</Link>
        </p>
      </Section>

      <Section {...sections.pricing}>
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
            <>
              <sub>
                {Array.from(new Array(index + 1)).map(() => "†")} {note}
              </sub>

              <br />
            </>
          ))}
        </div>
      </Section>

      <Section {...sections.creators}>
        <ul className={styles.creators} style={{ padding: 0 }}>
          {creators.map((creator, index) => (
            <Creator key={creator.name + index} {...creator} />
          ))}
        </ul>
      </Section>
    </>
  );
}
