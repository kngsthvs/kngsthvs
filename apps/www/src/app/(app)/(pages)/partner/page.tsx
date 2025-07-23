import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import { Form } from "./_components/form";
import styles from "./page.module.css";

export default async function Page() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: "partner",
  });

  return (
    <div className={styles.root}>
      <RichText
        className={styles.content}
        data={data.opening as React.ComponentProps<typeof RichText>["data"]}
      />

      <Form />
    </div>
  );
}
