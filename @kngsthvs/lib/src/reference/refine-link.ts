import { sanitizeUrl } from "@braintree/sanitize-url";

export function refineLink(link: string) {
  if (!link) return "/";

  if (link.includes("://") || link.includes("."))
    return sanitizeUrl(
      link.includes("://")
        ? link.replace(/^http:\/\//i, "https://")
        : "https://" + link,
    );

  return /^\//.test(link) ? link : `/${link}`;
}
