import { type TinaField } from "tinacms";
import { alt } from "./alt";

export const image: TinaField = {
  fields: [
    alt,
    {
      label: "Source",
      name: "src",
      type: "image",
    },
  ],
  label: "Image",
  name: "image",
  type: "object",
};
