import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { WS_DIVE } from "@/data/country-ws";

export const metadata: Metadata = pageMeta({ title: WS_DIVE.title, description: WS_DIVE.description, path: "/countries/ws/" });

export default function SamoaPage() {
  return <CountryDeepDive dive={WS_DIVE} />;
}
