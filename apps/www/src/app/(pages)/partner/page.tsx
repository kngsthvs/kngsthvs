import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { draftMode } from "next/headers";
import { Form } from "./_components/form";
import styles from "./page.module.css";

export default function Page() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 60 }}
      queries={[
        {
          partner: {
            __typename: true,
            _title: true,
            opening: {
              json: {
                content: true,
              },
            },
          },
        },
      ]}
    >
      {async ([{ partner }]) => {
        "use server"; // needs to be a Server Action

        return (
          <div className={styles.root}>
            <div className={styles.content}>
              <RichText>{partner.opening?.json.content}</RichText>
            </div>

            <Form />
          </div>
        );
      }}
    </Pump>
  );
}
