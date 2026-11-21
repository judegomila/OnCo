import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { NC_DIVE } from "@/data/country-nc";

export const metadata: Metadata = pageMeta({ title: NC_DIVE.title, description: NC_DIVE.description, path: "/countries/nc/" });

export default function NewCaledoniaPage() {
  return <CountryDeepDive dive={NC_DIVE} />;
}
