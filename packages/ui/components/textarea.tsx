"use client";

import { Field } from "@kngsthvs/ui/primitives/client/field";
import { RootLabel } from "./input";
import styles from "./input.module.css";

export function Textarea({
  disabled,
  label,
  name,
  placeholder,
  required,
  ...props
}: React.ComponentProps<typeof Field.Input> & {
  label?: string;
} & any) {
  return (
    <Field
      className={styles.root}
      data-disabled={disabled}
      {...{ name, placeholder }}
    >
      <RootLabel {...{ label }}>{label}</RootLabel>

      <Field.Textarea
        className={styles.input}
        rows={12}
        {...{ disabled, name, placeholder, required, ...props }}
      />
    </Field>
  );
}
