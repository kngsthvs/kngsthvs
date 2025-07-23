import { Partner } from "../home/_components/partner";
import { Section } from "../home/_components/section";
import config from "@payload-config";
import { getPayload } from "payload";
import homeStyles from "../home/page.module.css";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

function Item({
  length,
  path,
  ...props
}: {
  length: number;
  path: "partners";
}) {
  switch (path) {
    case "partners":
      return <Partner data-fill={length % 2 === 1} {...props} />;
    default:
      return null;
  }
}

export default async function Page(props: {
  params: Promise<{ path: string[] }>;
}) {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: "home",
  });
  const path = `${(await props.params).path[0]}` as keyof Pick<
    typeof data,
    "partners"
  >;
  const sections = data[path]?.reduce(
    // @ts-ignore (ts 2769)
    (accumulator, current) => {
      const section =
        accumulator?.length > 0
          ? accumulator.find(
              (section: { type: string }) => section.type === current.type,
            )
          : false;

      return section
        ? [
            ...accumulator.filter(
              (section: { type: string }) => section.type !== current.type,
            ),
            {
              // @ts-ignore (ts 2339)
              items: [...section.items, current],
              // @ts-ignore (ts 2339)
              type: section.type,
            },
          ]
        : accumulator?.length > 0
          ? [...accumulator, { items: [current], type: current.type }]
          : [{ items: [current], type: current.type }];
    },
    [],
  );

  if (!sections || !Array.isArray(sections)) {
    return notFound();
  }

  return (
    <article className={styles.root}>
      {sections.map((section: { items: any[]; type: string }) => (
        <Section
          key={section.type}
          title={section.type.charAt(0).toUpperCase() + section.type.slice(1)}
        >
          <ul className={homeStyles[path]}>
            {section.items.map((item, index) => {
              return (
                <Item
                  key={`${item.type}-${index}`}
                  length={section.items.length}
                  {...{ path, ...item }}
                />
              );
            })}
          </ul>
        </Section>
      ))}
    </article>
  );
}
