import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { PY_DIVE } from "@/data/country-py";

export const metadata: Metadata = pageMeta({ title: PY_DIVE.title, description: PY_DIVE.description, path: "/countries/py/" });

export default function ParaguayPage() {
  return <CountryDeepDive dive={PY_DIVE} />;
}
