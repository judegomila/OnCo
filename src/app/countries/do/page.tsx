import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { DO_DIVE } from "@/data/country-do";

export const metadata: Metadata = pageMeta({ title: DO_DIVE.title, description: DO_DIVE.description, path: "/countries/do/" });

export default function DominicanRepublicPage() {
  return <CountryDeepDive dive={DO_DIVE} />;
}
