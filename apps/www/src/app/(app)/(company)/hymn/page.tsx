import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import { Focus } from "./_components/focus";
import styles from "./page.module.css";

export default async function Page() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: "hymn",
  });

  return (
    <div className={styles.root}>
      <Focus />

      <RichText
        className={styles.content}
        data={data.body as React.ComponentProps<typeof RichText>["data"]}
      />
    </div>
  );
}
