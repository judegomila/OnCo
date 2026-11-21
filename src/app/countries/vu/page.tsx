import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { VU_DIVE } from "@/data/country-vu";

export const metadata: Metadata = pageMeta({ title: VU_DIVE.title, description: VU_DIVE.description, path: "/countries/vu/" });

export default function VanuatuPage() {
  return <CountryDeepDive dive={VU_DIVE} />;
}
