import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CL_DIVE } from "@/data/country-cl";

export const metadata: Metadata = pageMeta({ title: CL_DIVE.title, description: CL_DIVE.description, path: "/countries/cl/" });

export default function ChilePage() {
  return <CountryDeepDive dive={CL_DIVE} />;
}
