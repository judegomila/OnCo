import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { BS_DIVE } from "@/data/country-bs";

export const metadata: Metadata = pageMeta({ title: BS_DIVE.title, description: BS_DIVE.description, path: "/countries/bs/" });

export default function BahamasPage() {
  return <CountryDeepDive dive={BS_DIVE} />;
}
