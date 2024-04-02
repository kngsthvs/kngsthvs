/**
 * @see https://developer.1password.com/docs/web/compatible-website-design/
 * @see https://www.radix-ui.com/primitives/docs/components/form
 */

"use client";

import {
  Control,
  Field as RadixField,
  Label as RadixLabel,
  Message as RadixMessage,
} from "@radix-ui/react-form";
import InputFormat from "input-format/react";
import { createContext, useContext, useState } from "react";
import { mapDataAttributes } from "../../../functions/shared/attributes";

type Data = {
  placeholder?: boolean;
  touched?: boolean;
  value?: boolean;
};

type State = {
  touched?: boolean;
  value?: string;
};

const Context = createContext<
  | [
      {
        data?: { [key: string]: boolean };
        name: string;
        onChange?: React.ChangeEventHandler<
          HTMLInputElement | HTMLTextAreaElement
        >;
      } & State &
        Pick<React.HTMLProps<HTMLInputElement>, "placeholder">,
      React.Dispatch<React.SetStateAction<State>>,
    ]
  | undefined
>(undefined);

export function useField() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useField must be used within a Field");
  }

  return context;
}

export function Root({
  children,
  name,
  placeholder,
  ...props
}: React.ComponentProps<typeof RadixField> &
  React.PropsWithChildren<
    Omit<
      React.HTMLProps<
        HTMLDivElement & Pick<React.HTMLProps<HTMLInputElement>, "placeholder">
      >,
      "name"
    >
  >) {
  if (name === undefined) {
    throw new Error("Field requires a name");
  }

  const [state, setState] = useState<State>({
    touched: false,
    value: "",
  });

  const data = mapDataAttributes<Data>({
    ...state,
    placeholder: Boolean(placeholder),
    value: Boolean(
      state.value && typeof state.value === "string" && state.value?.length > 0,
    ),
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange !== undefined) props.onChange(event);
    if (state.touched === false)
      setState((value) => ({ ...value, touched: true }));
    setState((value) => ({ ...value, value: event.target.value }));
  };

  return (
    <Context.Provider
      value={[{ data, name, onChange, placeholder, ...state }, setState]}
    >
      <RadixField {...{ name, ...data, ...props }}>{children}</RadixField>
    </Context.Provider>
  );
}

function Input(
  props?:
    | (React.ComponentProps<typeof Control> &
        React.DetailedHTMLProps<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
        >)
    | React.ComponentProps<typeof InputFormat>,
) {
  const [{ data, onChange, value }, setField] = useField();

  if (props && "format" in props)
    return (
      <Control asChild>
        <InputFormat
          onChange={(event) => {
            setField((value) => ({
              ...value,
              value: event as string,
            }));
          }}
          {...{
            value,
            ...data,
            ...props,
          }}
        />
      </Control>
    );

  return (
    <Control
      {...{
        onChange,
        ...data,
        ...props,
      }}
    />
  );
}

function Label({
  children,
  ...props
}: React.ComponentProps<typeof RadixLabel>) {
  const [{ data }] = useField();

  return (
    <RadixLabel {...data} {...props}>
      {children}
    </RadixLabel>
  );
}

function Message({
  children,
  ...props
}: React.ComponentProps<typeof RadixMessage>) {
  return <RadixMessage {...props}>{children}</RadixMessage>;
}

function Textarea(
  props?: React.ComponentProps<typeof Control> &
    React.HTMLProps<HTMLTextAreaElement>,
) {
  const [{ data, onChange }] = useField();

  return (
    <Control asChild>
      <textarea
        {...{
          onChange,
          ...data,
          ...props,
        }}
      />
    </Control>
  );
}

export const Field = Object.assign(Root, {
  Input,
  Label,
  Message,
  Textarea,
});
