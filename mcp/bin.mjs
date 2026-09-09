#!/usr/bin/env node
// Launches the OnCo MCP server from a repository checkout (the server reads src/data and src/lib directly).
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const child = spawn(process.execPath, [join(here, "..", "node_modules", "tsx", "dist", "cli.mjs"), join(here, "server.ts")], { stdio: "inherit", cwd: join(here, "..") });
child.on("exit", (code) => process.exit(code ?? 0));
