import Link from "next/link";
import type { CompanyType } from "@/lib/schema";
import { COMPANY_TYPE_GLYPH, COMPANY_TYPE_LABEL, COMPANY_TYPE_TIP, companyTypeHref } from "@/lib/startups";
import { Tip } from "./Tip";

const pill = "chip border bg-card border-border hover:bg-foreground/5 hover:border-accent/50 inline-flex items-center gap-1.5 text-xs";

/**
 * The company type on a record page. Types with a glyph and a tooltip (cooperative groups) render as a pill linking to
 * the /companies/ browser filtered to that type; the rest render as the plain label with the same link. Server component.
 */
export function CompanyTypePill({ type }: { type: CompanyType }) {
  const label = COMPANY_TYPE_LABEL[type] ?? type;
  const glyph = COMPANY_TYPE_GLYPH[type];
  const tip = COMPANY_TYPE_TIP[type];
  if (!glyph || !tip) return <Link href={companyTypeHref(type)} className="hover:underline">{label}</Link>;
  return (
    <Tip title={label} text={tip} href={companyTypeHref(type)} linkLabel={`All ${label.toLowerCase()}s →`} inline={false}>
      <Link href={companyTypeHref(type)} className={pill} data-company-type={type}>
        <svg aria-hidden viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={glyph} /></svg>
        {label}
      </Link>
    </Tip>
  );
}
