import { Link } from "ui/primitives/link";

export function Social({
  children,
  keys,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  keys?: string;
}) {
  return (
    <li>
      <Link keys={`s ${keys}`} side="bottom" sideOffset={32} {...props}>
        {children}
      </Link>
    </li>
  );
}
