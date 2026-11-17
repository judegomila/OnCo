import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LS_DIVE } from "@/data/country-ls";

export const metadata: Metadata = pageMeta({ title: LS_DIVE.title, description: LS_DIVE.description, path: "/countries/ls/" });

export default function LesothoPage() {
  return <CountryDeepDive dive={LS_DIVE} />;
}
