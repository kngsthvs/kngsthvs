import { Tag } from "ui/components/tag";
import { Copyright } from "../copyright";
import { Color } from "./color";
import { Contrast } from "./contrast";
import styles from "./styles.module.css";
import { Theme } from "./theme";

function Commit() {
  const hash =
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

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
  const id = process.env.VERCEL_DEPLOYMENT_ID?.slice(
    process.env.VERCEL_DEPLOYMENT_ID.indexOf("_") + 1,
  );

  return (
    <Tag
      href={
        id ? `https://vercel.com/kngsthvs/kngsthvs/${id}/source` : undefined
      }
      variant={
        process.env.NODE_ENV === "production" ||
        process.env.VERCEL_ENV === "production"
          ? "primary"
          : process.env.VERCEL_ENV === "preview"
            ? "secondary"
            : "tertiary"
      }
    >
      {process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
        ? "PROD"
        : process.env.VERCEL_ENV === "preview"
          ? "PREV"
          : process.env.NODE_ENV === "test"
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

      <Commit />

      <Deployment />

      <Copyright />
    </div>
  );
}
