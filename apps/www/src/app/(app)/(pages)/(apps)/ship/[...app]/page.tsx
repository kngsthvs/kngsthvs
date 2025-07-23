import Image from "next/image";
import { notFound } from "next/navigation";
import crowsnest from "../../../../../../../public/logos/ship/crowsnest.svg";
import hold from "../../../../../../../public/logos/ship/hold.svg";
import tackle from "../../../../../../../public/logos/ship/tackle.svg";
import styles from "./page.module.css";
import config from "@payload-config";
import { getPayload } from "payload";

function getIcon(path?: string) {
  switch (path) {
    case "crowsnest":
      return crowsnest;
    case "hold":
      return hold;
    case "tackle":
      return tackle;
    default:
      return null;
  }
}

export default async function Page(props: {
  params: Promise<{ app: string[] }>;
}) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "apps",
    limit: 1,
    where: {
      id: {
        equals: (await props.params).app[0],
      },
    },
  });
  const icon = getIcon(docs[0]?.id);

  if (docs.length === 0 || !docs[0] || !icon) {
    notFound();
  }

  return (
    <div className={styles.root}>
      <Image alt="" quality={100} src={icon} />

      <p>{docs[0].description}</p>
    </div>
  );
}
