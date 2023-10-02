import styles from "./Section.module.css";

export function Section({
  _title,
  children,
  description,
  ...props
}: {
  _title?: string;
  children: React.ReactNode;
  description?: string | null;
}) {
  return (
    <section
      className={styles.root}
      id={_title?.toLowerCase().split(" ").join("-")}
      {...props}
    >
      {_title && <h2>{_title}</h2>}

      {description && <p>{description}</p>}

      {children}
    </section>
  );
}
