import { shuffle } from "@kngsthvs/lib/entropy/shuffle";
import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Balancer } from "@kngsthvs/ui/packages/balancer";
import { basehub } from "basehub";
import { headers } from "next/headers";
import { Suspense } from "react";
import ReactMarkdown from "react-markdown";
import { FeatureFlags } from "../_components/feature-flags";
import { Controls } from "./_components/controls";
import { Footer } from "./_components/footer";
import { Provider } from "./_components/pages";
import styles from "./layout.module.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const host = headersList.get("host") ?? headersList.get("x-forwarded-host");
  const nextUrl = headersList.get("next-url");
  const referer = headersList.get("referer");
  const pathname = host
    ? referer?.slice(referer.indexOf(host) + host.length, referer.length)
    : undefined;
  const { settings } = await basehub({ next: { revalidate: 30 } }).query({
    settings: {
      __typename: true,
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
  });

  const quote =
    settings.quotes.items[
      Math.floor(Math.random() * settings.quotes.items.length)
    ];
  const data = mapDataAttributes({ justify: quote?.justify });
  const whispers = shuffle<string>(
    settings.whispers.items.map(({ whisper }) => whisper),
  );

  return (
    <Provider
      controls={<Controls />}
      home={["/", "/home"].includes(nextUrl ?? pathname ?? "/")}
      {...{ whispers }}
    >
      <div className={styles.root}>
        {children}

        <Footer>
          <blockquote {...data}>
            <Balancer as="div">
              <ReactMarkdown>{quote?.content?.markdown}</ReactMarkdown>

              <footer>{quote?._title}</footer>
            </Balancer>
          </blockquote>
        </Footer>
      </div>

      {/* Vercel */}
      <Suspense fallback={null}>
        <FeatureFlags />
      </Suspense>
    </Provider>
  );
}
