import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { RW_DIVE } from "@/data/country-rw";

export const metadata: Metadata = pageMeta({ title: RW_DIVE.title, description: RW_DIVE.description, path: "/countries/rw/" });

export default function RwandaPage() {
  return <CountryDeepDive dive={RW_DIVE} />;
}
