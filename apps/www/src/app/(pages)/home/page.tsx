import pages from "@/content/pages.json";
import { Pump } from "basehub/react-pump";
import { type Metadata } from "next";
import { draftMode } from "next/headers";
import { Partner } from "./_components/partner";
import { Section } from "./_components/section";
import styles from "./page.module.css";

export const metadata: Metadata = {
  description: pages.description,
  title: pages.title,
};

export default function Page() {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 60 }}
      queries={[
        {
          home: {
            __typename: true,
            partners: {
              _title: true,
              items: {
                _title: true,
                href: true,
                logo: { rawUrl: true },
              },
            },
          },
        },
      ]}
    >
      {async ([{ home }]) => {
        "use server"; // Needs to be a Server Action

        return (
          <>
            {/* <Section href="/companies" keys="c" title="Companies">
              {null}
            </Section> */}

            <Section href="/partners" keys="p" title="Partners">
              <ul className={styles.partners}>
                {home.partners.items.map((partner) => (
                  <Partner
                    data-fill={Boolean(
                      Number(home.partners.items.length) % 2 === 1,
                    )}
                    href={partner.href}
                    key={partner.href}
                    logo={partner.logo}
                  />
                ))}
              </ul>
            </Section>

            {/* <Section href="/books" keys="b" title="Books">
              {null}
            </Section>

            <Section href="/films" keys="f" title="Films">
              {null}
            </Section>

            <Section href="/music" keys="m" title="Music">
              {null}
            </Section>

            <Section href="/videogames" keys="v" title="Video games">
              {null}
            </Section> */}
          </>
        );
      }}
    </Pump>
  );
}
