import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { KW_DIVE } from "@/data/country-kw";

export const metadata: Metadata = pageMeta({ title: KW_DIVE.title, description: KW_DIVE.description, path: "/countries/kw/" });

export default function KuwaitPage() {
  return <CountryDeepDive dive={KW_DIVE} />;
}
