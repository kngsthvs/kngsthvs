import { Link } from "@kngsthvs/ui/primitives/shared/link";
import styles from "./tag.module.css";

export function Tag({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) {
  if (props && "href" in props && typeof props.href === "string") {
    return (
      <Link className={styles.root} {...props}>
        {children}
      </Link>
    );
  }

  return <div className={styles.root}>{children}</div>;
}
