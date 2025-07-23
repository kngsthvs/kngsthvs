import Link from "next/link";
import { Fallback } from "../_components/fallback";

export default function Page() {
  return (
    <section>
      <Fallback title="Maintenance">
        <span>We are undergoing maintenance and will be back soon.</span>

        <Link href="/account">Manage account</Link>
      </Fallback>
    </section>
  );
}
