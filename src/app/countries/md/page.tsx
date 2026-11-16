import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MD_DIVE } from "@/data/country-md";

export const metadata: Metadata = pageMeta({ title: MD_DIVE.title, description: MD_DIVE.description, path: "/countries/md/" });

export default function MoldovaPage() {
  return <CountryDeepDive dive={MD_DIVE} />;
}
