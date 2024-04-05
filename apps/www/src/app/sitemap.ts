import { basehub } from "basehub";
import { type MetadataRoute } from "next";

const lastModified = new Date();
const pages = ["crowsnest", "partner", "vision"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { legal } = await basehub({ next: { revalidate: 60 } }).query({
    __typename: true,
    legal: {
      items: {
        _slug: true,
        updated: true,
      },
    },
  });

  return [
    {
      changeFrequency: "monthly",
      lastModified,
      priority: 1,
      url: `https://kngsthvs.com`,
    },
    ...(pages.map((page) => ({
      changeFrequency: "yearly",
      lastModified,
      priority: 0.8,
      url: `https://www.kngsthvs.com/${page}`,
    })) as MetadataRoute.Sitemap),
    ...(legal.items.map((page) => ({
      changeFrequency: "yearly",
      lastModified: page.updated ? new Date(page.updated) : lastModified,
      priority: 0.5,
      url: `https://www.kngsthvs.com/legal/${page._slug}`,
    })) as MetadataRoute.Sitemap),
  ];
}
