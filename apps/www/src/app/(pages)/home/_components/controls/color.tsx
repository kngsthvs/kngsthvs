"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import styles from "./color.module.css";

export function Color() {
  return (
    <div className={styles.root}>
      <button data-color="default" data-selected="true" type="button">
        <VisuallyHidden.Root>Default</VisuallyHidden.Root>
      </button>

      <button data-color="red" type="button">
        <VisuallyHidden.Root>Red</VisuallyHidden.Root>
      </button>

      <button data-color="green" type="button">
        <VisuallyHidden.Root>Green</VisuallyHidden.Root>
      </button>

      <button data-color="blue" type="button">
        <VisuallyHidden.Root>Blue</VisuallyHidden.Root>
      </button>
    </div>
  );
}
