import { T } from "./T";

/** Keyboard users: first Tab press reveals a link that jumps past the header to <main id="main">. */
export function SkipLink() {
  return (
    <a href="#main" className="skip-link"><T k="header.skip" /></a>
  );
}
