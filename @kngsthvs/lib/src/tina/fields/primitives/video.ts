import { type TinaField } from "tinacms";

export const video: TinaField = {
  fields: [
    {
      description: "A link to an external Vimeo or YouTube video",
      label: "External URL",
      name: "url",
      type: "string",
    },
    // {
    //   label: "Source",
    //   name: "src",
    //   type: "string",
    // },
  ],
  label: "Video",
  name: "video",
  type: "object",
};
