import { type TinaField } from "tinacms";
import { url } from "../primitives";

export const link = ({
  collections = [],
}: {
  collections: string[];
}): TinaField[] => {
  return [
    {
      label: "Name",
      name: "children",
      type: "string",
    },
    {
      collections,
      label: "Link",
      name: "href",
      type: "reference",
    },
    {
      ...url,
      description:
        "An external url will override any value in the reference field",
    },
  ];
};

export const nestedLink = ({ fields }: { fields: TinaField[] }): TinaField => ({
  fields: fields,
  label: "Nested Link",
  list: true,
  name: "links",
  type: "object",
  ui: {
    itemProps: ({ children }: { children: string }) => ({
      label: children ? children : "Link",
    }),
  },
});

export const links = ({ fields }: { fields: TinaField[] }): TinaField => ({
  fields,
  label: "Links",
  list: true,
  name: "links",
  type: "object",
  ui: {
    itemProps: ({ children }: { children: string }) => ({
      label: children ? children : "Link",
    }),
  },
});
