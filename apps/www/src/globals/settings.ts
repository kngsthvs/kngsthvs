import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const settings: GlobalConfig = {
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "description",
      type: "text",
    },
    {
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "source",
          type: "text",
        },
        {
          name: "body",
          type: "richText",
        },
        {
          name: "justified",
          type: "checkbox",
        },
      ],
      name: "quotes",
      type: "array",
    },
    {
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "whisper",
          type: "text",
        },
      ],
      name: "whispers",
      type: "array",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidatePath("/", "layout");

        return doc;
      },
    ],
  },
  slug: "settings",
};
