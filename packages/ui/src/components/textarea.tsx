"use client";

import { Field } from "@base-ui-components/react/field";
import { Input } from "@base-ui-components/react/input";
import { RootLabel } from "./input";
import styles from "./input.module.css";
export function Textarea({
  disabled,
  error,
  label,
  name,
  placeholder,
  required,
  ...props
}: React.ComponentProps<typeof Input> & {
  label?: string;
} & any) {
  return (
    <Field.Root
      className={styles.root}
      data-disabled={disabled}
      {...{ name, placeholder }}
    >
      <RootLabel {...{ label }}>{label}</RootLabel>

      <Input
        className={styles.input}
        render={(props) => <textarea {...props} />}
        rows={12}
        {...{ disabled, name, placeholder, required, ...props }}
      />

      {error ? <Field.Error>{error}</Field.Error> : null}
    </Field.Root>
  );
}
