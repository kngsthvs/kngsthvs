import { env } from "@/env";
import { Tag } from "ui/components/tag";
import { Color } from "./color";
import { Contrast } from "./contrast";
import styles from "./styles.module.css";
import { Theme } from "./theme";

function Commit() {
  const hash =
    env.VERCEL_GIT_COMMIT_SHA ?? env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

  return (
    <Tag
      href={
        hash ? `https://github.com/kngsthvs/kngsthvs/commit/${hash}` : undefined
      }
    >
      {hash ? hash.slice(0, 7) : "LOCAL"}
    </Tag>
  );
}

function Deployment() {
  const id = env.VERCEL_DEPLOYMENT_ID?.slice(
    env.VERCEL_DEPLOYMENT_ID.indexOf("_") + 1,
  );

  return (
    <Tag
      href={
        id ? `https://vercel.com/kngsthvs/kngsthvs/${id}/source` : undefined
      }
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
  );
}

export function Controls() {
  return (
    <div className={styles.root}>
      <Contrast />

      <Theme />

      <Color />

      {/* Git commit */}
      <Commit />

      {/* Vercel deployment */}
      <Deployment />

      <p>&copy; {new Date().getFullYear()} Kings & Thieves</p>
    </div>
  );
}
