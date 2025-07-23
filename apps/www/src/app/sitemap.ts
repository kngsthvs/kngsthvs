import config from "@payload-config";
import type { MetadataRoute } from "next";
import { getPayload } from "payload";

const lastModified = new Date();
const pages = [
  "partner",
  "partners",
  "ship/crowsnest",
  "ship/hold",
  "ship/tackle",
  "vision",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });
  const { docs: legal } = await payload.find({
    collection: "legal",
    limit: 10,
    select: {
      id: true,
      updated: true,
    },
  });

  return [
    {
      changeFrequency: "monthly",
      lastModified,
      priority: 1,
      url: `https://www.kngsthvs.com`,
    },
    ...(pages.map((page) => ({
      changeFrequency: "yearly",
      lastModified,
      priority: 0.8,
      url: `https://www.kngsthvs.com/${page}`,
    })) as MetadataRoute.Sitemap),
    ...(legal.map((page) => ({
      changeFrequency: "yearly",
      lastModified: page.updated ? new Date(page.updated) : lastModified,
      priority: 0.5,
      url: `https://www.kngsthvs.com/legal/${page.id}`,
    })) as MetadataRoute.Sitemap),
  ];
}
