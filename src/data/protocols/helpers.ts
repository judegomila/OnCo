import type { ProtocolInput } from "@/lib/schema";

/**
 * The builder every protocol file uses: fills `kind`, so a file reads as the protocol itself. One file per protocol
 * (or per small family of protocols), registered in ./index.ts. The rules for writing one are in docs/PROTOCOLS.md.
 */
export const protocol = (x: Omit<ProtocolInput, "kind">): ProtocolInput => ({ kind: "protocol", ...x });
