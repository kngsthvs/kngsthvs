import type { GlobalConfig } from "payload";
import { home } from "./home";
import { hymn } from "./hymn";
import { partner } from "./partner";
import { settings } from "./settings";
import { vision } from "./vision";

export const globals: GlobalConfig[] = [home, hymn, partner, settings, vision];
