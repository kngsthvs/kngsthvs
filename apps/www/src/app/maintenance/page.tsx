import Link from "next/link";
import { FeatureFlags } from "../../../../../@kngsthvs/ui/src/functions/server/feature-flags";
import { Error } from "../_components/error";

export default function Page() {
  return (
    <section>
      <Error title="Maintenance">
        <span>We are undergoing maintenance and will be back soon.</span>

        <Link href="/account">Manage account</Link>
      </Error>

      <FeatureFlags />
    </section>
  );
}
