import { shuffle } from "@kngsthvs/lib/entropy/shuffle";
import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Controls } from "@repo/ui/components/controls";
import { headers } from "next/headers";
import { getPayload } from "payload";
import { Balancer } from "react-wrap-balancer";
import { Footer } from "./_components/footer";
import { Provider } from "./_components/pages";
import styles from "./layout.module.css";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get("host") ?? headersList.get("x-forwarded-host");
  const referer = headersList.get("referer");
  const pathname = host
    ? referer?.slice(referer.indexOf(host) + host.length, referer.length)
    : undefined;
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: "settings",
  });
  const quote = data.quotes
    ? data.quotes[Math.floor(Math.random() * data.quotes.length)]
    : {
        body: "Beauty will save the world.",
        name: "Fyodor Dostoevsky",
        source: "The Idiot",
        justified: false
      };
  const whispers = shuffle<string>(
    data.whispers?.map(({ whisper }) => whisper),
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
          {quote && typeof quote !== "number" ? (
            <blockquote {...mapDataAttributes({ justify: quote.justified })}>
              <Balancer as="div">
                <RichText
                  data={
                    quote.body as React.ComponentProps<typeof RichText>["data"]
                  }
                />

                <footer>{quote.name}</footer>
              </Balancer>
            </blockquote>
          ) : null}
        </Footer>
      </div>
    </Provider>
  );
}
