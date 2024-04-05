import { env } from "@/env";
import { createClient } from "@vercel/edge-config";
import { decrypt, type FlagOverridesType } from "@vercel/flags";
import { cookies } from "next/headers";

interface FeatureFlags {
  maintenance: boolean;
}

/**
 * @see https://vercel.com/docs/workflow-collaboration/feature-flags/supporting-feature-flags#reading-feature-flag-overrides
 */
export async function get(key: string) {
  const edgeConfig = createClient(env.EDGE_CONFIG_FEATURE_FLAGS);
  const featureFlags = await edgeConfig.get<FeatureFlags>(key);
  const overrideCookie = cookies().get("vercel-flag-overrides")?.value;
  const overrides = overrideCookie
    ? await decrypt<FlagOverridesType>(overrideCookie)
    : {};
  const flags = featureFlags
    ? Object.keys(featureFlags).map((flag) => [
        flag,
        (overrides && overrides[flag as keyof FeatureFlags]) ??
          featureFlags[flag as keyof FeatureFlags],
      ])
    : [];

  return Object.fromEntries(flags) as FeatureFlags;
}

/**
 * @see https://github.com/vercel/examples/blob/main/edge-middleware/feature-flag-apple-store/lib/feature-flags.ts
 */

export async function getAll(key: string) {
  const edgeConfig = createClient(env.EDGE_CONFIG_FEATURE_FLAGS);
  const featureFlags = await edgeConfig.get<FeatureFlags>(key);

  return featureFlags;
}
