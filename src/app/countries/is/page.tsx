import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { IS_DIVE } from "@/data/country-is";

export const metadata: Metadata = pageMeta({ title: IS_DIVE.title, description: IS_DIVE.description, path: "/countries/is/" });

export default function IcelandPage() {
  return <CountryDeepDive dive={IS_DIVE} />;
}
