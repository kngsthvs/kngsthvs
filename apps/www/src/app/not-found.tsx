import Link from "next/link";
import { Fallback } from "./_components/fallback";

export default function NotFound() {
	return (
		<Fallback title="Not Found">
			<span>The page you were looking for could not be found.</span>

			<Link href="/">Return home</Link>
		</Fallback>
	);
}
