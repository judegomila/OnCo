import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TJ_DIVE } from "@/data/country-tj";

export const metadata: Metadata = pageMeta({ title: TJ_DIVE.title, description: TJ_DIVE.description, path: "/countries/tj/" });

export default function TajikistanPage() {
  return <CountryDeepDive dive={TJ_DIVE} />;
}
