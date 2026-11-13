import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { IQ_DIVE } from "@/data/country-iq";

export const metadata: Metadata = pageMeta({ title: IQ_DIVE.title, description: IQ_DIVE.description, path: "/countries/iq/" });

export default function IraqPage() {
  return <CountryDeepDive dive={IQ_DIVE} />;
}
