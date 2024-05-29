import { Pump } from "basehub/react-pump";
import { draftMode } from "next/headers";
import styles from "./page.module.css";

export default function Page({ params }: { params: { slide: string[] } }) {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 60 }}
      queries={[
        {
          investors: {
            __args: {
              filter: {
                _sys_slug: { eq: params.slide.at(-1) },
              },
            },
            items: {
              _slug: true,
              _title: true,
              content: {
                json: {
                  content: true,
                },
              },
            },
          },
        },
      ]}
    >
      {async () => {
        "use server"; // Needs to be a Server Action

        return <div className={styles.root} />;
      }}
    </Pump>
  );
}
