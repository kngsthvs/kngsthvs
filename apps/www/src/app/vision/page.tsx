import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main className={`dark ${styles.root}`}>
      <div>
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
                <Link href="/">
                  <Image
                    alt="Kings & Thieves icon"
                    height={60}
                    src="/icon.svg"
                    width={60}
                  />
                </Link>

                <div>
                  <RichText>{vision.body?.json.content}</RichText>
                </div>
              </div>
            );
          }}
        </Pump>
      </div>
    </main>
  );
}
