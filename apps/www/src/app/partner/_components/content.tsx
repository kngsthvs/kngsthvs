import { Pump } from "basehub/react-pump";
import { RichText } from "basehub/react-rich-text";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import styles from "./content.module.css";

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 60 }}
      queries={[
        {
          enter: {
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
      {async ([{ enter }]) => {
        "use server"; // needs to be a Server Action

        return (
          <div className={styles.root}>
            <Link href="/">
              <Image
                alt="Kings & Thieves icon"
                height={60}
                src="/icon.svg"
                width={60}
              />
            </Link>

            <div>
              <RichText>{enter.opening?.json.content}</RichText>
            </div>

            {children}
          </div>
        );
      }}
    </Pump>
  );
}
