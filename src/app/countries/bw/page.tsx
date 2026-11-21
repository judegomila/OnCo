import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BW_DIVE } from "@/data/country-bw";

export const metadata: Metadata = pageMeta({ title: BW_DIVE.title, description: BW_DIVE.description, path: "/countries/bw/" });

export default function BotswanaPage() {
  return <CountryDeepDive dive={BW_DIVE} />;
}
