import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { KP_DIVE } from "@/data/country-kp";

export const metadata: Metadata = pageMeta({ title: KP_DIVE.title, description: KP_DIVE.description, path: "/countries/kp/" });

export default function NorthKoreaPage() {
  return <CountryDeepDive dive={KP_DIVE} />;
}
