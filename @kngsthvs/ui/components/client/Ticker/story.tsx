// organize-imports-ignore
import * as React from "react";
import { type Meta, type StoryObj } from "@storybook/react";
import { Ticker } from "./index";

const meta: Meta<typeof Ticker> = {
  component: Ticker,
  title: "Components/Client/Ticker",
};

export default meta;

export const Default: StoryObj<typeof Ticker> = {
  args: {
    direction: "left",
    gap: 16,
    wheel: "element",
  },
  render: (args) => (
    <div style={{ height: "100vh", overflow: "hidden", width: "100%" }}>
      <Ticker {...args}>
        <div
          style={{
            display: "flex",
            flexDirection:
              args.direction === "down" || args.direction === "up"
                ? "column"
                : "row",
          }}
        >
          {[
            "rgba(0, 0, 0, 0.1)",
            "rgba(0, 0, 0, 0.2)",
            "rgba(0, 0, 0, 0.3)",
            "rgba(0, 0, 0, 0.4)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.6)",
            "rgba(0, 0, 0, 0.7)",
            "rgba(0, 0, 0, 0.8)",
            "rgba(0, 0, 0, 0.9)",
            "rgba(0, 0, 0)",
          ].map((backgroundColor, index) => (
            <div
              key={backgroundColor + index}
              style={{
                backgroundColor,
                height: "1rem",
                width: "1rem",
              }}
            />
          ))}
        </div>

        {[...Array(3)].map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "black",
              height: `${index + 1}rem`,
              width: `${index + 1}rem`,
            }}
          />
        ))}
      </Ticker>
    </div>
  ),
};

export const Drag: StoryObj<typeof Ticker> = {
  args: {
    direction: "left",
    drag: true,
    gap: 16,
  },
  render: (args) => (
    <div style={{ height: "100vh" }}>
      <Ticker {...args}>
        <div
          style={{
            backgroundColor: "black",
            height: "1rem",
            width: "1rem",
          }}
        />
      </Ticker>
    </div>
  ),
};

export const Wheel: StoryObj<typeof Ticker> = {
  args: {
    direction: "left",
    gap: 16,
    wheel: "element",
  },
  render: (args) => (
    <div style={{ height: "100vh" }}>
      <Ticker {...args}>
        <div
          style={{
            backgroundColor: "black",
            height: "1rem",
            width: "1rem",
          }}
        />
      </Ticker>
    </div>
  ),
};
