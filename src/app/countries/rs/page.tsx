import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { RS_DIVE } from "@/data/country-rs";

export const metadata: Metadata = pageMeta({ title: RS_DIVE.title, description: RS_DIVE.description, path: "/countries/rs/" });

export default function SerbiaPage() {
  return <CountryDeepDive dive={RS_DIVE} />;
}
