import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { NA_DIVE } from "@/data/country-na";

export const metadata: Metadata = pageMeta({ title: NA_DIVE.title, description: NA_DIVE.description, path: "/countries/na/" });

export default function NamibiaPage() {
  return <CountryDeepDive dive={NA_DIVE} />;
}
