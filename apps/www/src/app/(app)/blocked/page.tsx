import { Link } from "@kngsthvs/ui/primitives/shared/link";
import { Fallback } from "../_components/fallback";

export default function Page() {
  return (
    <section>
      <Fallback title="Blocked">
        <span>You have been blocked from accessing Kings & Thieves.</span>

        <Link href="https://www.kingjamesbibleonline.org/verse-of-day.php">
          Verse of the day
        </Link>
      </Fallback>
    </section>
  );
}
