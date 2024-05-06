import { generateKey } from "@kngsthvs/ui/functions/shared/generate-key";
import { Pump } from "basehub/react-pump";
import { draftMode } from "next/headers";
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

export async function generateStaticParams() {
  const paths = ["partners"];

  return paths.map((path) => [{ path }]);
}

export default function Page({ params }: { params: { path: string[] } }) {
  const path = `${params.path[0]}`;

  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 60 }}
      queries={[
        {
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
        },
      ]}
    >
      {async ([{ home }]) => {
        "use server"; // needs to be a Server Action

        const sections = (home[path] as { items?: any[] }).items?.reduce(
          (accumulator, current) => {
            const section =
              accumulator?.length > 0
                ? accumulator.find(
                    (section: { type: string }) =>
                      section.type === current.type,
                  )
                : false;

            return section
              ? [
                  ...accumulator.filter(
                    (section: { type: string }) =>
                      section.type !== current.type,
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
                title={
                  section.type.charAt(0).toUpperCase() + section.type.slice(1)
                }
                key={section.type}
              >
                <ul className={homeStyles[path]}>
                  {section.items.map((item, index) => {
                    return (
                      <Item
                        length={section.items.length}
                        key={item.type + generateKey(index)}
                        {...{ path, ...item }}
                      />
                    );
                  })}
                </ul>
              </Section>
            ))}
          </article>
        );
      }}
    </Pump>
  );
}
