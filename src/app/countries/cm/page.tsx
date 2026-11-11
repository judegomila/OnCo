import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CM_DIVE } from "@/data/country-cm";

export const metadata: Metadata = pageMeta({ title: CM_DIVE.title, description: CM_DIVE.description, path: "/countries/cm/" });

export default function CameroonPage() {
  return <CountryDeepDive dive={CM_DIVE} />;
}
