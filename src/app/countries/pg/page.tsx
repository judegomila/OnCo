import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PG_DIVE } from "@/data/country-pg";

export const metadata: Metadata = pageMeta({ title: PG_DIVE.title, description: PG_DIVE.description, path: "/countries/pg/" });

export default function PapuaNewGuineaPage() {
  return <CountryDeepDive dive={PG_DIVE} />;
}
