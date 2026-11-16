import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { UY_DIVE } from "@/data/country-uy";

export const metadata: Metadata = pageMeta({ title: UY_DIVE.title, description: UY_DIVE.description, path: "/countries/uy/" });

export default function UruguayPage() {
  return <CountryDeepDive dive={UY_DIVE} />;
}
