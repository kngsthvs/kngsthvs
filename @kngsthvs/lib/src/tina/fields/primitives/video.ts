import { type TinaField } from "tinacms";

export const video: TinaField = {
  fields: [
    {
      description: "A link to an external Vimeo or YouTube video",
      label: "External URL",
      name: "url",
      type: "string",
    },
    {
      description: "The image that shows while the video is loading",
      label: "Poster",
      name: "poster",
      type: "image",
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
