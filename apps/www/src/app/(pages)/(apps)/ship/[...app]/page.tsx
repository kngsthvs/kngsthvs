import { Pump } from "basehub/react-pump";
import { draftMode } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import crowsnest from "../../../../../../public/logos/ship/crowsnest.svg";
import hold from "../../../../../../public/logos/ship/hold.svg";
import tackle from "../../../../../../public/logos/ship/tackle.svg";
import styles from "./page.module.css";

function getIcon(path?: string) {
  switch (path) {
    case "crowsnest":
      return crowsnest;
    case "hold":
      return hold;
    case "tackle":
      return tackle;
    default:
      return null;
  }
}

export default function Page({ params }: { params: { app: string[] } }) {
  return (
    <Pump
      draft={draftMode().isEnabled}
      next={{ revalidate: 60 }}
      queries={[
        {
          apps: {
            __args: {
              filter: {
                _sys_slug: { eq: params.app.at(-1) },
              },
            },
            _title: true,
            items: {
              _slug: true,
              _title: true,
              description: true,
              status: true,
            },
          },
        },
      ]}
    >
      {async ([{ apps }]) => {
        "use server"; // Needs to be a Server Action

        const icon = getIcon(apps.items[0]?._slug);

        if (apps.items.length === 0 || !icon) {
          notFound();
        }

        return (
          <div className={styles.root}>
            <p>{apps.items[0]?.status}</p>

            <Image alt="" quality={100} src={icon} />

            <p>{apps.items[0]?.description}</p>
          </div>
        );
      }}
    </Pump>
  );
}
