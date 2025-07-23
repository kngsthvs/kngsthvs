import styles from "./page.module.css";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getPayload } from "payload";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slide: string }>;
}) {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: "vision",
  });
  const id = (await props.params).slide;

  if (!data.slides) {
    return notFound();
  }

  return (
    <div className={styles.root}>
      <RichText
        data={
          data.slides.find((slide) => slide.id === id)
            ?.body as React.ComponentProps<typeof RichText>["data"]
        }
      />
    </div>
  );
}
