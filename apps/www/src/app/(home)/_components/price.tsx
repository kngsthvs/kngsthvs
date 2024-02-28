import styles from "./price.module.css";

export function Price({
  description,
  title,
}: {
  description?: string;
  title?: string;
}) {
  return (
    <li className={styles.root}>
      <h3>{title}</h3>

      <h4>
        & ${description} per month<sup>††</sup>
      </h4>
    </li>
  );
}
