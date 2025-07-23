import type { CollectionConfig } from "payload";

export const media: CollectionConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      label: "Alternative text",
      name: "alt",
      required: true,
      type: "text",
    },
  ],
  slug: "media",
  upload: true,
};
