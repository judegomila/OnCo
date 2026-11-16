import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PT_DIVE } from "@/data/country-pt";

export const metadata: Metadata = pageMeta({ title: PT_DIVE.title, description: PT_DIVE.description, path: "/countries/pt/" });

export default function PortugalPage() {
  return <CountryDeepDive dive={PT_DIVE} />;
}
