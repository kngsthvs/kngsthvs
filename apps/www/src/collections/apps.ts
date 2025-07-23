import { revalidatePath } from "next/cache";
import type { CollectionConfig } from "payload";

export const apps: CollectionConfig = {
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
      name: "description",
      type: "text",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidatePath(`/apps/ship/${doc.path}`, "page");

        return doc;
      },
    ],
  },
  slug: "apps",
};
