// @ts-nocheck
// organize-imports-ignore
import * as React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { parseDigit, templateFormatter, templateParser } from "input-format";
import { Field } from "./index";
import { Form } from "../form";

const meta: Meta<typeof Field> = {
  component: Field,
  parameters: {
    layout: "centered",
  },
  title: "Primitives/Client/Field",
};

export default meta;

type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    label: "Label",
    name: "input",
    placeholder: "Input",
  },
  render: (args) => (
    <Form>
      <Field {...args}>
        {args.label && <Field.Label>{args.label}</Field.Label>}

        <Field.Input />
      </Field>
    </Form>
  ),
};

export const Textarea: Story = {
  args: {
    label: "Label",
    name: "textarea",
    placeholder: "Textarea",
  },
  render: (args) => (
    <Form>
      <Field {...args}>
        {args.label && <Field.Label>{args.label}</Field.Label>}

        <Field.Textarea />
      </Field>
    </Form>
  ),
};

export const Format: Story = {
  args: {
    label: "Phone",
    name: "phone",
    placeholder: "(000) 000-0000",
  },
  render: (args) => {
    const template = `(xxx) xxx-xxxx`;

    return (
      <Form>
        <Field {...args}>
          {args.label && <Field.Label>{args.label}</Field.Label>}

          <Field.Input
            format={templateFormatter(template)}
            max={10}
            min={10}
            parse={templateParser(template, parseDigit)}
            type="tel"
          />
        </Field>
      </Form>
    );
  },
};
