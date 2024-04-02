import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { draftMode } from "next/headers";
import { Focus } from "./_components/focus";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.root}>
      <Focus />

      <Pump
        draft={draftMode().isEnabled}
        next={{ revalidate: 60 }}
        queries={[
          {
            vision: {
              __typename: true,
              _title: true,
              body: {
                json: {
                  content: true,
                },
              },
            },
          },
        ]}
      >
        {async ([{ vision }]) => {
          "use server"; // needs to be a Server Action

          return (
            <div className={styles.content}>
              <RichText>{vision.body?.json.content}</RichText>
            </div>
          );
        }}
      </Pump>
    </div>
  );
}
