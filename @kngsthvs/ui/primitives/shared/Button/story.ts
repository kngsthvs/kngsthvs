import { type Meta, type StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  title: "Primitives/Shared/Button",
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Button",
  },
};
