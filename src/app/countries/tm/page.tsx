import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TM_DIVE } from "@/data/country-tm";

export const metadata: Metadata = pageMeta({ title: TM_DIVE.title, description: TM_DIVE.description, path: "/countries/tm/" });

export default function TurkmenistanPage() {
  return <CountryDeepDive dive={TM_DIVE} />;
}
