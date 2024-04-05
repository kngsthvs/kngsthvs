import { getAll } from "@/lib/feature-flags";
import { encrypt } from "@vercel/flags";
import { FlagValues } from "@vercel/flags/react";

export async function FeatureFlags() {
  const featureFlags = await getAll("www");
  const values = await encrypt(featureFlags as object);

  return <FlagValues {...{ values }} />;
}
