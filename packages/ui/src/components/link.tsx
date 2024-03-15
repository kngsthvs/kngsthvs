import { Link as LinkPrimitive } from "../primitives/link";
import styles from "./link.module.css";

export function Link({
  children,
  ...props
}: React.ComponentProps<typeof LinkPrimitive>) {
  return (
    <LinkPrimitive className={styles.root} {...props}>
      {children}
    </LinkPrimitive>
  );
}
