export function refineLink(link: string) {
  if (!link) return "/";

  if (link.includes("://") || link.includes("."))
    return link.includes("://")
      ? link.replace(/^http:\/\//i, "https://")
      : "https://" + link;

  return /^\//.test(link) ? link : `/${link}`;
}
