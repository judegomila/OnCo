import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CW_DIVE } from "@/data/country-cw";

export const metadata: Metadata = pageMeta({ title: CW_DIVE.title, description: CW_DIVE.description, path: "/countries/cw/" });

export default function CuracaoPage() {
  return <CountryDeepDive dive={CW_DIVE} />;
}
