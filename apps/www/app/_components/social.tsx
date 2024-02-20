import { Link } from "@kngsthvs/ui/primitives/shared/link";

export function Social({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <Link {...{ href }}>{children}</Link>
    </li>
  );
}
