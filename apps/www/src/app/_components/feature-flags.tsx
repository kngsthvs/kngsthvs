import { getAll } from "@/lib/feature-flags";
import { encrypt, type FlagDefinitionsType } from "@vercel/flags";
import { FlagDefinitions, FlagValues } from "@vercel/flags/react";
import { Suspense } from "react";

async function Definitions() {
  const definitions = await encrypt({} as FlagDefinitionsType);

  return <FlagDefinitions {...{ definitions }} />;
}

async function Values() {
  const featureFlags = await getAll("www");
  const values = await encrypt(featureFlags as object);

  return <FlagValues {...{ values }} />;
}

export function FeatureFlags() {
  return (
    <>
      <Suspense fallback={null}>
        <Definitions />
      </Suspense>

      <Suspense fallback={null}>
        <Values />
      </Suspense>
    </>
  );
}
