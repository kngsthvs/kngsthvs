import { Effect } from "effect";
import { type NextRequest, NextResponse } from "next/server";
import { maintenance } from "./flags";

export const config = {
	matcher: "/",
};

export async function middleware(req: NextRequest) {
	try {
		if (await maintenance()) {
			req.nextUrl.pathname = "/maintenance";

			return NextResponse.rewrite(req.nextUrl);
		}
	} catch (error) {
		Effect.logError(error);
	}
}
