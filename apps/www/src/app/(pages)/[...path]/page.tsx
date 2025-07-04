import { basehub } from "basehub";
import { Partner } from "../home/_components/partner";
import { Section } from "../home/_components/section";
import homeStyles from "../home/page.module.css";
import styles from "./page.module.css";

function getQuery(path: string) {
  switch (path) {
    case "partners":
      return {
        href: true,
        logo: { rawUrl: true },
        type: true,
      };
    default:
      return undefined;
  }
}
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
  const path = `${(await props.params).path[0]}`;
  const { home } = await basehub({ next: { revalidate: 60 } }).query({
    home: {
      __typename: true,
      [path]: {
        _title: true,
        items: {
          _title: true,
          ...getQuery(path),
        },
      },
    },
  });
  const sections = (home[path] as { items?: any[] }).items?.reduce(
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
              items: [...section.items, current],
              type: section.type,
            },
          ]
        : accumulator?.length > 0
          ? [...accumulator, { items: [current], type: current.type }]
          : [{ items: [current], type: current.type }];
    },
    [],
  );

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
