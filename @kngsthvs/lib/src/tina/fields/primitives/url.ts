import { type TinaField } from "tinacms";
import { url as urlSchema } from "../../../schemas";

export const url: TinaField = {
  label: "URL",
  name: "url",
  type: "string",
  ui: {
    validate: (value: string) => {
      if (!value) return;
      if (value.startsWith("#") || value.startsWith("/")) return;
      if (urlSchema.safeParse(value).success === false)
        return "Please enter a valid URL";
    },
  },
};
