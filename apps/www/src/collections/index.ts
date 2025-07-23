import type { CollectionConfig } from "payload";
import { admins } from "./admins";
import { apps } from "./apps";
import { legal } from "./legal";
import { media } from "./media";

export const collections: CollectionConfig[] = [admins, apps, legal, media];
