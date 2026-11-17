import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SZ_DIVE } from "@/data/country-sz";

export const metadata: Metadata = pageMeta({ title: SZ_DIVE.title, description: SZ_DIVE.description, path: "/countries/sz/" });

export default function EswatiniPage() {
  return <CountryDeepDive dive={SZ_DIVE} />;
}
