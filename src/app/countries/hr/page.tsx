import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { HR_DIVE } from "@/data/country-hr";

export const metadata: Metadata = pageMeta({ title: HR_DIVE.title, description: HR_DIVE.description, path: "/countries/hr/" });

export default function CroatiaPage() {
  return <CountryDeepDive dive={HR_DIVE} />;
}
