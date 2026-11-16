import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PR_DIVE } from "@/data/country-pr";

export const metadata: Metadata = pageMeta({ title: PR_DIVE.title, description: PR_DIVE.description, path: "/countries/pr/" });

export default function PuertoRicoPage() {
  return <CountryDeepDive dive={PR_DIVE} />;
}
