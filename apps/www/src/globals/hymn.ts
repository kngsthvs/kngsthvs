import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

export const hymn: GlobalConfig = {
  fields: [
    {
      name: "body",
      type: "richText",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidatePath("/hymn", "page");

        return doc;
      },
    ],
  },
  slug: "hymn",
};
