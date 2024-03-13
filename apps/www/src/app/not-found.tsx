import Link from "next/link";
import { Error } from "./_components/error";

export default function NotFound() {
  return (
    <Error title="Not Found">
      <span>The page you were looking for could not be found.</span>

      <Link href="/">Return home</Link>
    </Error>
  );
}
