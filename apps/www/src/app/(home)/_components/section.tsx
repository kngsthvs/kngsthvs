import styles from "./section.module.css";

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
      <h2>{_title}</h2>

      <p>{description}</p>

      {children}
    </section>
  );
}
