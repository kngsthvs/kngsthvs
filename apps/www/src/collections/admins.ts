import type { CollectionConfig } from "payload";

export const admins: CollectionConfig = {
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "firstName",
      required: true,
      type: "text",
    },
    {
      name: "lastName",
      required: true,
      type: "text",
    },
  ],
  slug: "admins",
};
