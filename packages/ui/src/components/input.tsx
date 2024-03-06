"use client";

import { mapDataAttributes } from "@kngsthvs/ui/functions/shared/attributes";
import { Field, useField } from "@kngsthvs/ui/primitives/client/field";
import styles from "./input.module.css";

function RootInput(props: React.ComponentProps<typeof Field.Input>) {
  return <Field.Input className={styles.input} {...props} />;
}

export function RootLabel({
  children,
  label,
}: React.ComponentProps<typeof Field.Label> & {
  label?: string;
}) {
  const [{ placeholder, value }] = useField();
  const data = mapDataAttributes({
    show: Boolean(label && placeholder),
    value: Boolean(value),
  });

  return (
    <Field.Label className={styles.label} {...data}>
      {children}
    </Field.Label>
  );
}

function Root({
  disabled,
  label,
  name,
  placeholder,
  required,
  ...props
}: React.ComponentProps<typeof Field.Input> & {
  label?: string;
}) {
  return (
    <Field
      className={styles.root}
      data-disabled={disabled}
      {...{ name, placeholder }}
    >
      <RootLabel {...{ label }}>{label}</RootLabel>

      <RootInput
        autoComplete={
          name === "email"
            ? "email"
            : name === "city"
              ? "address-level2"
              : name === "country"
                ? "country"
                : name === "firstName"
                  ? "given-name"
                  : name === "lastName"
                    ? "family-name"
                    : name === "phone"
                      ? "tel-national"
                      : name === "state"
                        ? "address-level1"
                        : name === "street"
                          ? "street-address"
                          : name === "zip"
                            ? "postal-code"
                            : "off"
        }
        className={styles.input}
        type={name === "email" ? name : name === "phone" ? "tel" : "text"}
        {...{ disabled, name, placeholder, required, ...props }}
      />
    </Field>
  );
}

function Group({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLProps<HTMLDivElement>>) {
  return (
    <div className={styles.group} {...props}>
      {children}
    </div>
  );
}

export const Input = Object.assign(Root, { Group });
