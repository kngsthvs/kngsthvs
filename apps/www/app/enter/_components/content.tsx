import { basehub } from "basehub";
import { RichText } from "basehub/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./content.module.css";

export async function Content({ children }: { children: React.ReactNode }) {
  const { enter } = await basehub({ next: { revalidate: 60 } }).query({
    __typename: true,
    enter: {
      __typename: true,
      _title: true,
      opening: {
        json: {
          content: true,
        },
      },
    },
  });

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
        {/* @ts-expect-error ts(2786) */}
        <RichText>{enter.opening?.json.content}</RichText>
      </div>

      {children}
    </div>
  );
}
