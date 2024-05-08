import { FeatureFlags } from "@kngsthvs/ui/functions/server/feature-flags";
import Link from "next/link";
import { Error } from "../_components/error";

export default function Page() {
  return (
    <section>
      <Error title="Maintenance">
        <span>We are undergoing maintenance and will be back soon.</span>

        <Link href="/account">Manage account</Link>
      </Error>

      <FeatureFlags id="www" />
    </section>
  );
}
