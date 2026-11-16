import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { MA_DIVE } from "@/data/country-ma";

export const metadata: Metadata = pageMeta({ title: MA_DIVE.title, description: MA_DIVE.description, path: "/countries/ma/" });

export default function MoroccoPage() {
  return <CountryDeepDive dive={MA_DIVE} />;
}
