import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { env } from "@/env";
import { media } from "../collections/media";

export const storage = vercelBlobStorage({
  collections: {
    [media.slug]: true,
  },
  token: env.BLOB_READ_WRITE_TOKEN,
});
