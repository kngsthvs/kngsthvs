import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const home: GlobalConfig = {
  fields: [
    {
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "href",
          type: "text",
        },

        {
          filterOptions: {
            mimeType: { contains: "image" },
          },
          name: "logo",
          relationTo: "media",
          type: "upload",
        },
        {
          name: "type",
          options: [
            {
              label: "Business",
              value: "business",
            },
            {
              label: "Church",
              value: "church",
            },
          ],
          type: "select",
        },
      ],
      name: "partners",
      type: "array",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidatePath("/", "page");

        return doc;
      },
    ],
  },
  slug: "home",
};
