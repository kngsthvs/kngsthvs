import { get } from "@kngsthvs/lib/vercel/feature-flags";
import { Effect } from "effect";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: "/",
};

export async function middleware(req: NextRequest) {
  try {
    if (await get("www").then((value) => value.maintenance)) {
      req.nextUrl.pathname = "/maintenance";

      return NextResponse.rewrite(req.nextUrl);
    }
  } catch (error) {
    Effect.logError(error);
  }
}
