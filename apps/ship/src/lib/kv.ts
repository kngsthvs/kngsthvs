import { createStorage } from "unstorage";
import vercelKVDriver from "unstorage/drivers/vercel-kv";

export const storage = createStorage({
	driver: vercelKVDriver({
		base: "ship",
	}),
});
