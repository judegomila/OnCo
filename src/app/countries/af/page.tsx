import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { AF_DIVE } from "@/data/country-af";

export const metadata: Metadata = pageMeta({ title: AF_DIVE.title, description: AF_DIVE.description, path: "/countries/af/" });

export default function AfghanistanPage() {
  return <CountryDeepDive dive={AF_DIVE} />;
}
