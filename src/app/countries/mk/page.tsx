import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MK_DIVE } from "@/data/country-mk";

export const metadata: Metadata = pageMeta({ title: MK_DIVE.title, description: MK_DIVE.description, path: "/countries/mk/" });

export default function NorthMacedoniaPage() {
  return <CountryDeepDive dive={MK_DIVE} />;
}
