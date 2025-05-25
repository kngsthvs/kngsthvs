/**
 * @see https://nextjs.org/docs/app/api-reference/functions/headers#ip-address
 */

import "server-only";

import { headers } from "next/headers";

const FALLBACK_IP_ADDRESS = "0.0.0.0";

export async function getIP() {
	const headersList = await headers();
	const forwardedFor = headersList.get("x-forwarded-for");

	if (forwardedFor) {
		return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
	}

	return headersList.get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}
