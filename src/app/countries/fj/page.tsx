import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { FJ_DIVE } from "@/data/country-fj";

export const metadata: Metadata = pageMeta({ title: FJ_DIVE.title, description: FJ_DIVE.description, path: "/countries/fj/" });

export default function FijiPage() {
  return <CountryDeepDive dive={FJ_DIVE} />;
}
