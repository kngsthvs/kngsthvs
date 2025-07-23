import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const vision: GlobalConfig = {
  fields: [
    {
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "title",
          type: "text",
        },
        { name: "body", type: "richText" },
      ],
      name: "slides",
      type: "array",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidatePath("/vision", "page");

        return doc;
      },
    ],
  },
  slug: "vision",
};
