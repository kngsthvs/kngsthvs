import Link from "next/link";
import { Suspense } from "react";
import { Error } from "../_components/error";
import { FeatureFlags } from "../_components/feature-flags";

export default function Page() {
  return (
    <section>
      <Error title="Maintenance">
        <span>We are undergoing maintenance and will be back soon.</span>

        <Link href="/account">Manage account</Link>
      </Error>

      <Suspense fallback={null}>
        <FeatureFlags />
      </Suspense>
    </section>
  );
}
