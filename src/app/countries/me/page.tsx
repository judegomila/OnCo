import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ME_DIVE } from "@/data/country-me";

export const metadata: Metadata = pageMeta({ title: ME_DIVE.title, description: ME_DIVE.description, path: "/countries/me/" });

export default function MontenegroPage() {
  return <CountryDeepDive dive={ME_DIVE} />;
}
