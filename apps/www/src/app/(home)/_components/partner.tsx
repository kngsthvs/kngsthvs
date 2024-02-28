import { Link } from "@kngsthvs/ui/primitives/shared/link";
import Image from "next/image";
import appStyles from "./app.module.css";
import styles from "./partner.module.css";

export function Partner({
  href,
  logo,
  ...props
}: {
  href: string | null;
  logo: { alt?: string | null; rawUrl: string } | null;
}) {
  return (
    <li className={`${styles.root} ${appStyles.partner}`} {...props}>
      {href && logo?.rawUrl ? (
        <Link {...{ href }}>
          <Image
            alt={logo.alt ?? "logo"}
            height={240}
            src={logo.rawUrl}
            width={240}
          />
        </Link>
      ) : (
        <div />
      )}
    </li>
  );
}
