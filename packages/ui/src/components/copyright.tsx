import styles from "./copyright.module.css";

export function Copyright() {
  return (
    <p className={styles.root}>&#9767; &copy; {new Date().getFullYear()}</p>
  );
}
