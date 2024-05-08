import { getAll } from "@kngsthvs/lib/vercel/feature-flags";
import { encrypt, type FlagDefinitionsType } from "@vercel/flags";
import { FlagDefinitions, FlagValues } from "@vercel/flags/react";
import { Suspense } from "react";

async function Definitions() {
  const definitions = await encrypt({} as FlagDefinitionsType);

  return <FlagDefinitions {...{ definitions }} />;
}

async function Values({ id }: { id: string }) {
  const featureFlags = await getAll(id);
  const values = await encrypt(featureFlags as object);

  return <FlagValues {...{ values }} />;
}

export function FeatureFlags({ id }: { id: string }) {
  return (
    <>
      <Suspense fallback={null}>
        <Definitions />
      </Suspense>

      <Suspense fallback={null}>
        <Values {...{ id }} />
      </Suspense>
    </>
  );
}
