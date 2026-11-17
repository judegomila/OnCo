import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TT_DIVE } from "@/data/country-tt";

export const metadata: Metadata = pageMeta({ title: TT_DIVE.title, description: TT_DIVE.description, path: "/countries/tt/" });

export default function TrinidadAndTobagoPage() {
  return <CountryDeepDive dive={TT_DIVE} />;
}
