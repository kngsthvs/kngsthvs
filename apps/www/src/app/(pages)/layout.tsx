import { shuffle } from "@kngsthvs/lib/entropy/shuffle";
import { FeatureFlags } from "@kngsthvs/ui/functions/server/feature-flags";
import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { basehub } from "basehub";
import { headers } from "next/headers";
import ReactMarkdown from "react-markdown";
import { Balancer } from "react-wrap-balancer";
import { Controls } from "ui/components/controls";
import { Footer } from "./_components/footer";
import { Provider } from "./_components/pages";
import styles from "./layout.module.css";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const host = headersList.get("host") ?? headersList.get("x-forwarded-host");
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
      home={["/", "/home"].includes(
        headersList.get("next-url") ?? pathname ?? "/",
      )}
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
      <FeatureFlags id="www" />
    </Provider>
  );
}
