"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import ReactInput from "input-format/react";
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
  [
    {
      data?: { [key: string]: boolean };
      name?: string;
      onChange?: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
      >;
    } & State &
      Pick<React.HTMLProps<HTMLInputElement>, "placeholder">,
    React.Dispatch<React.SetStateAction<State>> | undefined,
  ]
>([
  {
    name: undefined,
  },
  undefined,
]);

export function Root({
  children,
  name,
  placeholder,
  ...props
}: React.PropsWithChildren<
  React.HTMLProps<
    HTMLDivElement &
      Pick<React.HTMLProps<HTMLInputElement>, "name"> &
      Pick<React.HTMLProps<HTMLInputElement>, "placeholder">
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
      <div {...data} {...props}>
        {children}
      </div>
    </Context.Provider>
  );
}

function Input<T>(
  props?: (
    | React.HTMLProps<HTMLInputElement>
    | React.ComponentProps<typeof ReactInput>
  ) & { format?: any } & T,
) {
  const [{ data, name, onChange, placeholder, value }, setField] = useField();

  if (props && props["format"])
    return (
      <ReactInput
        id={name}
        onChange={(event: any) =>
          setField &&
          setField((value) => ({
            ...value,
            value: props && props["format"] ? event : event.target.value,
          }))
        }
        {...{
          name,
          placeholder,
          value,
          ...data,
          ...(props as React.ComponentProps<typeof ReactInput>),
        }}
      />
    );

  return (
    <input
      id={name}
      {...{
        name,
        onChange,
        placeholder,
        ...data,
        ...props,
      }}
    />
  );
}

function Textarea<T>(props?: React.HTMLProps<HTMLTextAreaElement> & T) {
  const [{ data, name, onChange, placeholder }] = useField();

  return (
    <textarea
      id={name}
      {...{
        name,
        onChange,
        placeholder,
        ...data,
        ...props,
      }}
    />
  );
}

function Label({
  children,
  ...props
}: React.PropsWithChildren<{ className?: string }>) {
  const [{ data, name, placeholder }] = useField();

  return (
    <LabelPrimitive.Root htmlFor={name} {...data} {...props}>
      {children ?? placeholder}
    </LabelPrimitive.Root>
  );
}

export const Field = Object.assign(Root, {
  Input,
  Label,
  Textarea,
});

export function useField() {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useField must be used within a Field");
  }

  return context;
}
