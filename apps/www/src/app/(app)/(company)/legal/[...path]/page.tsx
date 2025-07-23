import type { Metadata } from "next";
import { notFound } from "next/navigation";
import pages from "@/content/pages.json";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import styles from "./page.module.css";

export const metadata: Metadata = {
  description: pages.description,
  title: pages.title,
};

export default async function Page(props: {
  params: Promise<{ path: string[] }>;
}) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "legal",
    limit: 1,
    where: {
      id: {
        equals: (await props.params).path[0],
      },
    },
  });
  const updated = new Date(String(docs[0]?.updated));

  if (!docs[0]) {
    notFound();
  }

  return (
    <div className={styles.root}>
      <article>
        {typeof docs[0].updated === "string" ? (
          <p>
            Last updated:{" "}
            {updated.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        ) : null}

        <h1>{docs[0]?.title}</h1>

        <RichText
          data={docs[0].body as React.ComponentProps<typeof RichText>["data"]}
        />
      </article>
    </div>
  );
}
