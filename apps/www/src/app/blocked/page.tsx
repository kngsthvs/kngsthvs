import { Link } from "@kngsthvs/ui/primitives/shared/link";
import { Error } from "../_components/error";

export default function Page() {
  return (
    <section>
      <Error title="Blocked">
        <span>You have been blocked from accessing Kings & Thieves.</span>

        <Link href="https://www.kingjamesbibleonline.org/verse-of-day.php">
          Verse of the day
        </Link>
      </Error>
    </section>
  );
}
