import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { TG_DIVE } from "@/data/country-tg";

export const metadata: Metadata = pageMeta({ title: TG_DIVE.title, description: TG_DIVE.description, path: "/countries/tg/" });

export default function TogoPage() {
  return <CountryDeepDive dive={TG_DIVE} />;
}
