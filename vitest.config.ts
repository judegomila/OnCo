import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({ resolve: { alias: { "@": path.resolve(__dirname, "src") } }, test: {
    // The machine is shared and often loaded; whole-corpus tests need more than the 5 s default.
    testTimeout: 30_000, include: ["src/**/*.test.ts", "scripts/**/*.test.ts", "packages/*/src/**/*.test.ts"] } });
