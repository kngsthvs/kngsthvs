import * as esbuild from "esbuild";

await esbuild.build({
  bundle: true,
  entryPoints: ["eslint/*", "prettier/*", "tsconfig/*"],
  external: ["@vercel/style-guide"],
  outdir: "dist",
  platform: "node",
});
