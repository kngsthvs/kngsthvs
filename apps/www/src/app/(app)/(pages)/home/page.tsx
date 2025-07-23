import config from "@payload-config";
import type { Metadata } from "next";
import { getPayload } from "payload";
import pages from "@/content/pages.json";
import { Partner } from "./_components/partner";
import { Section } from "./_components/section";
import styles from "./page.module.css";

export const metadata: Metadata = {
  description: pages.description,
  title: pages.title,
};

export default async function Page() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: "home",
  });

  const partners = data.partners;

  return (
    <>
      {/* <Section href="/companies" keys="c" title="Companies">
        {null}
      </Section> */}

      {partners ? (
        <Section href="/partners" keys="p" title="Partners">
          <ul className={styles.partners}>
            {partners.map((partner) =>
              typeof partner !== "number" ? (
                <Partner
                  data-fill={Boolean(Number(partners.length) % 2 === 1)}
                  href={partner.href}
                  key={partner.href}
                  logo={partner.logo}
                />
              ) : null,
            )}
          </ul>
        </Section>
      ) : null}

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
}
