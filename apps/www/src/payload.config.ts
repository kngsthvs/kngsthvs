import path from "node:path";
import { fileURLToPath } from "node:url";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { env } from "@/env";
import { collections } from "./collections";
import { admins } from "./collections/admins";
import { resendAdapter } from "@payloadcms/email-resend";
import { globals } from "./globals";
import { plugins } from "./plugins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: admins.slug,
  },
  collections,
  db: vercelPostgresAdapter(),
  editor: lexicalEditor(),
  email: resendAdapter({
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: env.RESEND_DEFAULT_ADDRESS,
    defaultFromName: env.RESEND_DEFAULT_NAME,
  }),
  globals,
  graphQL: {
    disable: true,
  },
  plugins,
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
