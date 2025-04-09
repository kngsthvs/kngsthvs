import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { draftMode } from "next/headers";
import styles from "./page.module.css";

export const revalidate = 60;

export default function Page({ params }: { params: { slide: string } }) {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 60 }}
      queries={[
        {
          vision: {
            __args: {
              filter: {
                _sys_slug: { eq: params.slide },
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
      {async ([{ vision }]) => {
        "use server"; // Needs to be a Server Action

        return (
          <div className={styles.root}>
            <RichText>{vision.items[0]?.content?.json.content}</RichText>
          </div>
        );
      }}
    </Pump>
  );
}
