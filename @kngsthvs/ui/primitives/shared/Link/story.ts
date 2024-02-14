import { type Meta, type StoryObj } from "@storybook/react";
import { Link } from "./index";

const meta: Meta<typeof Link> = {
  component: Link,
  parameters: {
    layout: "centered",
  },
  title: "Primitives/Shared/Link",
};

export default meta;

export const Default: StoryObj<typeof Link> = {
  args: {
    children: "Link",
    href: "/",
  },
};
