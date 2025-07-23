import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Link } from "@kngsthvs/ui/primitives/shared/link";
import styles from "./tag.module.css";

export function Tag({
  children,
  variant = "tertiary",
  ...props
}: React.PropsWithChildren<
  React.ComponentProps<typeof Link> & {
    variant?: "primary" | "secondary" | "tertiary";
  }
>) {
  const data = mapDataAttributes({
    variant,
  });

  if (props && "href" in props && typeof props.href === "string") {
    return (
      <Link className={styles.root} {...{ ...data, ...props }}>
        {children}
      </Link>
    );
  }

  return (
    <div className={styles.root} {...data}>
      {children}
    </div>
  );
}
