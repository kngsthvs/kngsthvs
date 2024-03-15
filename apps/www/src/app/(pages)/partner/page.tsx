import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={styles.root}>
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
            <div className={styles.content}>
              <Link href="/">
                <Image
                  alt="Kings & Thieves icon"
                  height={60}
                  src="/icon.svg"
                  width={60}
                />
              </Link>

              <div>
                <RichText>{partner.opening?.json.content}</RichText>
              </div>
            </div>
          );
        }}
      </Pump>
    </main>
  );
}
