/** Executable entry: bundled to dist/onco.mjs by scripts/build-packages.ts. */
import { run } from "./onco";

run(process.argv.slice(2)).then((code) => { process.exitCode = code; }, (err: Error) => { process.stderr.write(`onco: ${err.message}\n`); process.exitCode = 1; });
