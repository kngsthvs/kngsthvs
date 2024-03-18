import { env } from "@/env";
import { Tag } from "ui/components/tag";
import { Color } from "./color";
import styles from "./styles.module.css";

function Commit() {
  const hash = String(
    env.VERCEL_GIT_COMMIT_SHA ??
      env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ??
      "LOCAL",
  ).slice(0, 7);

  return (
    <Tag
      href={
        hash === "LOCAL"
          ? undefined
          : `https://github.com/kngsthvs/kngsthvs/commit/${hash}`
      }
    >
      {hash}
    </Tag>
  );
}

export function Controls() {
  return (
    <div className={styles.root}>
      <Color />

      {/* Environment */}
      <Tag
        variant={
          env.NODE_ENV === "production" || env.VERCEL_ENV === "production"
            ? "primary"
            : env.VERCEL_ENV === "preview"
              ? "secondary"
              : "tertiary"
        }
      >
        {env.NODE_ENV === "production" || env.VERCEL_ENV === "production"
          ? "PROD"
          : env.VERCEL_ENV === "preview"
            ? "PREV"
            : env.NODE_ENV === "test"
              ? "TEST"
              : "DEV"}
      </Tag>

      {/* Git commit */}
      <Commit />

      <p>&copy; {new Date().getFullYear()} Kings & Thieves</p>
    </div>
  );
}
