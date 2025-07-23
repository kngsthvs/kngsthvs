import type { AppType } from "./server";
import { hc } from "hono/client";

const client = hc<AppType>("/api");
const res = await client.hello.$get({
  query: {
    name: "Hono",
  },
});
