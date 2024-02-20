import Link from "next/link";
import { Heading } from "./_components/heading";

export default function NotFound() {
  return (
    <Heading
      description={
        <span>
          The page you were looking for could not be found.
          <br />
          <Link href="/">Return home {"->"}</Link>
        </span>
      }
    >
      Not Found
    </Heading>
  );
}
