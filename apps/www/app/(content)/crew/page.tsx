import { Link as LinkPrimitive } from "@kngsthvs/ui/primitives/shared/Link";
import { basehub } from "basehub";
import { IoGlobeOutline } from "react-icons/io5";
import { VisuallyHidden } from "ui/components";
import { Button } from "ui/components/Button";
import { Anchors } from "../Anchors";
import { Heading } from "../Heading";
import { Section } from "../Section";
import styles from "./styles.module.css";

export default async function Page() {
  const { crew } = await basehub().query({
    __typename: true,
    crew: {
      _title: true,
      cities: {
        items: {
          _title: true,
          description: true,
          members: {
            _title: true,
            items: {
              _title: true,
              calendar: true,
              email: true,
              role: true,
              website: true,
              x: true,
            },
          },
        },
      },
      heading: true,
    },
  });

  return (
    <>
      <Heading>{crew.heading}</Heading>

      <Anchors>
        {crew?.cities?.items.map((city) => (
          <Anchors.Anchor
            href={`#${city._title.toLowerCase().split(" ").join("-")}`}
          >
            {city._title}
          </Anchors.Anchor>
        ))}
      </Anchors>

      <section className={styles.crew}>
        {crew?.cities?.items.map((city) => (
          <Section {...city}>
            <ul style={{ padding: 0 }}>
              {city.members.items.map((member, index) => (
                <li className={styles.creator} key={member._title + index}>
                  <span>
                    {member._title && <h3>{member._title}</h3>}

                    {member.role && <p>{member.role}</p>}
                  </span>

                  <span>
                    {member.website && (
                      <LinkPrimitive href={member.website}>
                        <IoGlobeOutline />

                        <VisuallyHidden>Website</VisuallyHidden>
                      </LinkPrimitive>
                    )}

                    {member.x && (
                      <LinkPrimitive href={`https://x.com/${member.x}`}>
                        <img alt="X logo" src="/x.svg" />

                        <VisuallyHidden>X</VisuallyHidden>
                      </LinkPrimitive>
                    )}

                    <Button href={`mailto:${member.email}`}>
                      Send an email
                    </Button>

                    {/* <Button href={member.calendar}>
                      Schedule a call
                    </Button> */}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        ))}
      </section>
    </>
  );
}
