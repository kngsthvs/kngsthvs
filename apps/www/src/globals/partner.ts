import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const partner: GlobalConfig = {
  fields: [
    {
      name: "opening",
      type: "richText",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidatePath("/partner", "page");

        return doc;
      },
    ],
  },
  slug: "partner",
};
