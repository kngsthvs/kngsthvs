import { Link } from "@kngsthvs/ui/primitives/shared/link";
import Image from "next/image";
import appStyles from "../../_components/app.module.css";
import styles from "./partner.module.css";

export function Partner({
  href,
  logo,
  ...props
}: {
  href?: string | null;
  logo?: number | { alt?: string | null; url?: string | null } | null;
}) {
  if (typeof logo === "number") {
    return null;
  }

  return (
    <li className={`${styles.root} ${appStyles.partner}`} {...props}>
      {href && logo?.url ? (
        <Link {...{ href }}>
          <Image
            alt={logo.alt ?? "logo"}
            height={40}
            quality={100}
            src={logo.url}
            width={200}
          />
        </Link>
      ) : null}
    </li>
  );
}
