import { defineConfig } from "tsup";

export default defineConfig({
  dts: true,
  entry: ["components", "functions", "packages", "primitives", "scripts"],
});
