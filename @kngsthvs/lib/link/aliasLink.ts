import { refineLink } from "./refineLink";

export function aliasLink({
  destination,
  link,
  origin,
}: {
  destination: string;
  link: string;
  origin: string;
}) {
  if (!link) return "/";

  if (origin && link.includes(origin)) return link.replace(origin, destination);

  return refineLink(link);
}
