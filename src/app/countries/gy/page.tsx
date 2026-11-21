import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { GY_DIVE } from "@/data/country-gy";

export const metadata: Metadata = pageMeta({ title: GY_DIVE.title, description: GY_DIVE.description, path: "/countries/gy/" });

export default function GuyanaPage() {
  return <CountryDeepDive dive={GY_DIVE} />;
}
