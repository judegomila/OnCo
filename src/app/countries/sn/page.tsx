import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { SN_DIVE } from "@/data/country-sn";

export const metadata: Metadata = pageMeta({ title: SN_DIVE.title, description: SN_DIVE.description, path: "/countries/sn/" });

export default function SenegalPage() {
  return <CountryDeepDive dive={SN_DIVE} />;
}
