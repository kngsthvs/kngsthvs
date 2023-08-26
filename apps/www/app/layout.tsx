import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import { Button } from "ui/components";
import { VisuallyHidden } from "ui/components/client";
import { mapDataAttributes } from "ui/functions";
import { Balancer, Link as LinkPrimitive } from "ui/primitives";
import "ui/styles";
import "ui/styles/globals.css";
import quotes from "./_data/quotes.json";
import styles from "./styles.module.css";

const inter = Inter({
  weight: ["400", "600"],
  subsets: ["latin"],
});

function External({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li className={styles.external}>
      <LinkPrimitive {...{ href }}>{children}</LinkPrimitive>
    </li>
  );
}

function Link({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <li>
      <NextLink {...{ href }}>{children}</NextLink>
    </li>
  );
}

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
  const { author, justify, quote } =
    quotes[Math.floor(Math.random() * quotes.length)];
  const data = mapDataAttributes({ justify });

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={`dark ${styles.header}`}>
          <nav>
            <span>
              <ul>
                <Link href="#our-work">Our work</Link>
                <Link href="#pricing">Pricing</Link>
                <Link href="#creators">Creators</Link>
                {/* <Link>Friends</Link> */}
              </ul>
            </span>

            <NextLink href="/">
              <img alt="Kings & Thieves icon" src="/&.svg" />
            </NextLink>

            <span>
              {/* <Button>My account</Button> */}
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
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <blockquote className="dark" {...data}>
            <Balancer as="div">
              <ReactMarkdown children={quote} />

              <footer dangerouslySetInnerHTML={{ __html: author }} />
            </Balancer>
          </blockquote>

          <section>
            <p>Proudly made in Texas for the glory of Christ.</p>

            <img alt="Texas" src="/texas.svg" />
          </section>

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

            <ul className="list">
              {/* <External>
                <img alt="Along Journal logo" src="/along.svg" />

                <VisuallyHidden>Along</VisuallyHidden>
              </External> */}
            </ul>
          </nav>
        </footer>

        <>
          <Analytics />
        </>
      </body>
    </html>
  );
}
