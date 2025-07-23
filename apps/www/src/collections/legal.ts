import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const legal: CollectionConfig = {
  fields: [
    {
      admin: {
        position: "sidebar",
      },
      name: "id",
      type: "text",
    },
    {
      name: "title",
      required: true,
      type: "text",
    },
    {
      name: "body",
      type: "richText",
    },

    {
      admin: {
        position: "sidebar",
      },
      name: "updated",
      type: "date",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidatePath(`/legal/${doc.path}`, "page");

        return doc;
      },
    ],
  },
  slug: "legal",
};
