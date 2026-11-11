import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PA_DIVE } from "@/data/country-pa";

export const metadata: Metadata = pageMeta({ title: PA_DIVE.title, description: PA_DIVE.description, path: "/countries/pa/" });

export default function PanamaPage() {
  return <CountryDeepDive dive={PA_DIVE} />;
}
