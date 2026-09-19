# Health data compliance for OnCo accounts

**Engineering analysis, not legal advice.** Written by an agent from the code and the public sources listed at the end, each read on 18 September 2026. A lawyer must check every conclusion before OnCo relies on it. The owner decisions in section 6 are not made here.

## Summary

- **HIPAA does not apply to OnCo today.** OnCo is not a health plan, clearinghouse or provider and does not handle health information for one, so it is neither a covered entity nor a business associate [1]. That changes the day a clinic, hospital or insurer sends patient records to OnCo, or OnCo builds a feature for one.
- **What does apply:** GDPR and UK GDPR treat a user's cancer type as special category health data needing explicit consent [13][17][18]; Washington's My Health My Data Act (MHMDA) covers any site targeting Washington consumers, with a private right of action [9][10]; Nevada and Connecticut have similar laws enforced only by attorneys general [11][12]; the FTC Health Breach Notification Rule (HBNR) covers health apps holding personal health records [6][7][8]; California's CPRA size thresholds are not met [19][20].
- **Today the exposure is small and mostly wording.** Profile, saved items and watchlist live only in the visitor's browser; OnCo holds no copy, so there is nothing for OnCo to breach. Gaps: no explicit, separate consent for the cancer-type question; Google Analytics with no consent gate for EEA and UK visitors; no MHMDA language on the privacy page.
- **Recommendation: stay browser-only (option A), fix those gaps, prepare option B (encrypted sync) next.** A costs nothing extra. B costs about 20 to 45 USD a month at a few thousand users. C, a HIPAA-eligible stack with signed BAAs, costs at least 1,070 USD a month before two unpublished prices and buys nothing OnCo needs until a clinic is involved.
- **Unconfirmed vendor facts:** the Supabase HIPAA add-on price and whether WorkOS offers EU data residency.

## 1. Does HIPAA apply?

**Covered entity** (45 CFR 160.103): "(1) A health plan. (2) A health care clearinghouse. (3) A health care provider who transmits any health information in electronic form in connection with a transaction covered by this subchapter" [1]. OnCo publishes reference information and never furnishes, bills or is paid for care.

**Business associate:** a person who "on behalf of such covered entity ... creates, receives, maintains, or transmits protected health information" [1]. Nobody covered by HIPAA has engaged OnCo. A person typing their own cancer type into a website is not a covered entity, and what they type is not protected health information (PHI), which must be "created or received by a health care provider, health plan, employer, or health care clearinghouse" [1].

**OnCo's actual flows** (checked in `src/lib/account.ts` and `src/app/layout.tsx`):

| Flow | What moves | HIPAA view |
| --- | --- | --- |
| WorkOS AuthKit PKCE sign-in | email, name, WorkOS user id | not PHI |
| Profile (role, optional cancer type, country, view, language, theme, consent time) | `localStorage` keyed by WorkOS user id, never sent | not PHI; OnCo never holds it |
| Saved items, watchlist, reading mode | `localStorage` only | same |
| Supabase magic link and watchlist | in code, unused fallback | nothing stored |
| Newsletter box | email to a list provider only if `NEXT_PUBLIC_SIGNUP_ACTION` is set | not health data |
| Google Analytics gtag | page paths and device data to Google | not PHI; see GDPR |

**Honest answer:** HIPAA does not apply. **The scenario that changes it:** OnCo receives records from a clinic, hospital or insurer, or offers them a service (say, an appointment-prep tool a cancer centre embeds). OnCo then becomes a business associate and needs a BAA with that entity and every vendor touching the data. Breach notice is due "without unreasonable delay and in no case later than 60 calendar days after discovery" [2]; HHS is told at the same time for 500 or more people, or in an annual log for fewer [3]. Encrypted data "unusable, unreadable, or indecipherable" to the attacker is not unsecured PHI, so its loss is not reportable [4]. The HHS explainer page returned HTTP 403 to automated fetching, so the regulation text is cited instead [5].

## 2. What does apply

**GDPR and UK GDPR.** Article 3(2) reaches a controller outside the EU offering services to people in the Union, paid or free [14]. Article 9(1) prohibits processing "data concerning health" unless a condition applies; the realistic one is 9(2)(a), "the data subject has given explicit consent to the processing of those personal data for one or more specified purposes" [13]. The ICO counts inferred data when an organisation intends "to treat someone differently on the basis of inferred information", as a personalised cancer page does [17]. Explicit consent "must be confirmed in a clear statement", must name the data type, and "should be separate from any other consents you are seeking" [18]. A controller also needs an Article 6 basis, a privacy notice, access and erasure handling, and 72-hour breach notice to the regulator [15]; Article 9 fines reach 20 million EUR or 4 % of turnover [16]. Even with the profile only in the browser, OnCo wrote the code that decides what is collected and why, so a regulator would likely still call OnCo the controller. Separately, `gtag('config', ...)` in `src/app/layout.tsx` sets Google cookies for EEA and UK visitors with no consent gate; Google's consent mode basic setting blocks tags until consent is given [34].

**California CPRA.** "Personal information collected and analyzed concerning a consumer's health" is sensitive personal information [19], which consumers may limit to "providing you with the services you requested" [20]. It applies only to a for-profit business with over 25 million USD revenue, data on 100,000 or more consumers or households, or half its revenue from selling personal information [19]. OnCo meets none.

**Washington MHMDA (RCW 19.373).** A regulated entity provides "products or services that are targeted to consumers in Washington" and decides how consumer health data is handled [9][10]. Consumer health data covers "past, present, or future physical or mental health status" and "data derived or extrapolated from nonhealth information" [9]. Duties: a separate consumer health data privacy policy; consent "prior to the collection or sharing"; access, withdrawal and deletion within 45 days; no sale without signed authorisation; no geofencing [9][10]. Crucially, "any violation of the Act is a per se violation of the Washington Consumer Protection Act", which private individuals can sue under [10].

**Nevada SB 370.** Same shape: a regulated entity targets "consumers in this State"; collection or sharing needs "the affirmative, voluntary consent of the consumer"; consumers can confirm, list third parties, stop collection and delete; a privacy policy is required. Effective 31 March 2024. Violations are deceptive trade practices, but the Act does "not create a private right of action" [11].

**Connecticut SB 3 (Public Act 23-56).** From 1 July 2023: no staff access to consumer health data without a duty of confidentiality, no geofencing within 1,750 feet of mental, reproductive or sexual health facilities, no sale without consent. The attorney general has "exclusive authority to enforce"; no private right of action [12].

**FTC HBNR (16 CFR Part 318).** Covers "vendors of personal health records", related entities and their service providers; excludes HIPAA covered entities [6][7]. The 2024 revision reaches "health apps and similar technologies not covered by HIPAA" and counts "a company's disclosure of covered information without a person's authorization" (say, to advertisers) as a breach [7][8]. Individuals are told within 60 calendar days, the FTC at the same time for 500 or more people; penalties reach 53,088 USD per violation [7]. A personal health record is "an electronic record of identifiable health information on an individual that has the technical capacity to draw information from multiple sources and that is managed, shared, and controlled by or primarily for the individual" [7]. Today's profile is one value OnCo never receives, so OnCo holds no record it could breach. Options B and C change that: a server-side profile plus saved items from many pages looks very like a PHR. The present-day risk is analytics: cancer-specific page paths tied to an identified user could be read as an unauthorised disclosure, so keep analytics anonymous and gated.

## 3. Vendor capabilities

**WorkOS.** "SOC 2 Type 2 certified", "GDPR and CCPA compliant", annual third-party penetration tests, and "Yes, WorkOS can sign business associate agreements for customers under enterprise plans" [21]. Enterprise pricing is unpublished; AuthKit is free to a million monthly active users [22]. Data residency: no EU region or hosting location appears on the security page, docs or privacy policy; **unconfirmed** [21]. User metadata allows "up to 10 key-value pairs", keys to 40 and values to 600 ASCII characters, and WorkOS says "Never store sensitive information in metadata such as passwords, API keys, or other private information" [23][24]. It can carry a small encrypted blob; plain-text PHI there breaks vendor guidance.

**Vercel.** SOC 2 Type 2, ISO 27001:2022, AES-256 at rest, TLS 1.3 in transit, EU-US Data Privacy Framework [25]. Vercel acts "as a business associate" and signs BAAs "with eligible Pro and Enterprise customers"; Pro teams buy the HIPAA BAA add-on at 350 USD a month [25][26]. Functions, CDN and the build pipeline are covered; Secure Compute is Enterprise only [25][27]. Runtime logs keep path, user agent and region for 1 hour (Hobby), 1 day (Pro) or 3 days (Enterprise) [28], so a function must never put health data in a URL or `console.log`.

**Supabase.** "All customer data is encrypted at rest with AES-256 and in transit via TLS"; US, EU and Asia Pacific regions; SOC 2 Type 2; ISO 27001 [32]. Row level security limits rows with a policy like `using ((select auth.uid()) = user_id)` [33]. HIPAA needs a signed BAA plus the HIPAA add-on, "available as paid add-on" on Team (599 USD a month) and Enterprise only; the add-on price is unpublished, **unconfirmed** [29][31]. A HIPAA project must run Point in Time Recovery with a compute add-on (from 100 USD a month), SSL enforcement, network restrictions and connection logging [30][31].

**Client-side encryption alternative.** The browser derives a key (from a user passphrase, or a secret WorkOS returns only to the signed-in session) and encrypts the profile before it leaves the device; the server stores ciphertext only. Under HIPAA's safe harbour a ciphertext leak is not reportable [4]; the HBNR "unsecured" test works the same way [6]. Limits: a lost passphrase loses the data; the server cannot search, filter or send "what changed for your cancer" emails without the key; a session-derived key is only as strong as the WorkOS account; and in some readings ciphertext is still PHI, so once a covered entity is involved it removes breach duties, not the BAA duty.

## 4. Options ranked by cost and complexity

| | A. Browser-only (today) | B. Encrypted sync via one Vercel function | C. HIPAA-eligible backend with BAAs |
| --- | --- | --- | --- |
| Where data lives | visitor's `localStorage` only | ciphertext in WorkOS user metadata (6 KB cap) or a Supabase Pro table with RLS; key stays in the browser | Supabase Team + HIPAA add-on; Vercel Pro + BAA add-on; WorkOS Enterprise BAA |
| Threat model | device theft, shared computers, rogue extensions; no server to attack | plus stolen WorkOS API key, function bugs, key loss | full server-side exposure: RLS mistakes, leaked keys, logs, insider access at three vendors |
| Breach duties | none for OnCo; GDPR still wants a process | GDPR 72 hours [15]; HBNR 60 days if a PHR [7]; MHMDA deletion within 45 days [9]; encrypted loss likely not reportable | all of B plus HIPAA 60-day notice and BAA terms [2][3] |
| Cost a month, a few thousand users | 0 USD extra | 20 USD Vercel Pro seat, WorkOS free, optional Supabase Pro 25 USD: 20 to 45 USD | 20 + 350 Vercel, 599 Supabase Team, 100 PITR compute, Supabase HIPAA add-on (unpriced), WorkOS Enterprise (unpriced): at least 1,070 USD |
| Complexity | done | one function, one key path, a recovery story | three vendor contracts, security programme, audit logging, annual review |
| Privacy policy must say | profile stays on device; explicit consent for cancer type; MHMDA section; analytics consent; how to delete | plus what is synced, that OnCo cannot read it, retention, deletion route, sub-processors, transfers | plus HIPAA notice of privacy practices when acting for a covered entity, BAA list, breach procedure |

## 5. Recommendation

**A now, build towards B, do not start C.**

OnCo holds no health data today, the cheapest compliance position there is; the work is wording. The laws that clearly apply (GDPR, UK GDPR, MHMDA, Nevada) are met by explicit consent, a plain policy and a working deletion route, all within the current architecture. Option C spends over 1,000 USD a month on BAAs nobody has asked for. Option B delivers the roadmap items (persistent cancer choice across devices, trial subscriptions) while keeping OnCo unable to read the data.

Immediate fixes under A:

1. Make the cancer-type question a separate, explicit opt-in with a one-sentence purpose; keep storing the consent time.
2. Gate Google Analytics behind consent mode for EEA and UK visitors, or drop it for signed-in sessions.
3. Add an MHMDA-style consumer health data section to `/privacy`: what is collected, why, that it never leaves the device, how to delete.
4. Keep the Supabase fallback disabled until B is designed.

## 6. Owner decisions checklist

- [ ] **Legal entity**: which entity is the controller and, later, party to any BAA.
- [ ] **Privacy contact or DPO**: a named address for requests; a formal DPO is only needed for large-scale special category processing, which A is not.
- [ ] **BAA signatures**: none for A or B; for C, Vercel (Pro add-on), Supabase (Team), WorkOS (Enterprise).
- [ ] **Retention period**: A, until the user clears storage; B and C, pick a number (for example 24 months inactive).
- [ ] **Deletion flow**: A, sign-out clears the profile; B and C, a delete-account button that wipes data and the WorkOS user.
- [ ] **Consent wording**: one sentence for the cancer-type opt-in, one for analytics.
- [ ] **Security incident process**: who is told, within what hours, who drafts the 72-hour regulator notice.
- [ ] **Penetration test**: not for A; a short third-party test of the function and key derivation before B ships.
- [ ] **Documents or notes**: will OnCo ever accept uploaded records or free-text notes? "No" keeps HIPAA and HBNR at arm's length; "yes" means option C from day one.

## Glossary

- **BAA**: business associate agreement, the HIPAA vendor contract.
- **CPRA / CCPA**: California Privacy Rights Act, amending the California Consumer Privacy Act.
- **DPO**: data protection officer under GDPR.
- **GDPR / UK GDPR**: EU General Data Protection Regulation and its UK copy.
- **HBNR**: FTC Health Breach Notification Rule, 16 CFR Part 318.
- **HIPAA**: US Health Insurance Portability and Accountability Act, 45 CFR Parts 160 and 164.
- **MHMDA**: Washington My Health My Data Act, RCW 19.373.
- **PHI**: protected health information under HIPAA.
- **PHR**: personal health record under the HBNR.
- **PKCE**: Proof Key for Code Exchange, the browser-only OAuth flow OnCo uses.
- **RLS**: row level security in Postgres.
- **SOC 2 Type 2**: an audit of a vendor's security controls over a period.

## Sources

All read on 18 September 2026.

1. 45 CFR 160.103, https://www.govinfo.gov/content/pkg/CFR-2023-title45-vol2/xml/CFR-2023-title45-vol2-sec160-103.xml
2. 45 CFR 164.404, https://www.govinfo.gov/content/pkg/CFR-2023-title45-vol2/xml/CFR-2023-title45-vol2-sec164-404.xml
3. 45 CFR 164.408, https://www.govinfo.gov/content/pkg/CFR-2023-title45-vol2/xml/CFR-2023-title45-vol2-sec164-408.xml
4. 45 CFR 164.402, https://www.govinfo.gov/content/pkg/CFR-2023-title45-vol2/xml/CFR-2023-title45-vol2-sec164-402.xml
5. HHS covered entities page (HTTP 403 to fetch), https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html
6. FTC HBNR rule page, https://www.ftc.gov/legal-library/browse/rules/health-breach-notification-rule
7. FTC HBNR compliance guide, https://www.ftc.gov/business-guidance/resources/complying-ftcs-health-breach-notification-rule-0
8. FTC 2024 final rule release, https://www.ftc.gov/news-events/news/press-releases/2024/04/ftc-finalizes-changes-health-breach-notification-rule
9. RCW 19.373, https://app.leg.wa.gov/rcw/default.aspx?cite=19.373&full=true
10. Washington Attorney General MHMDA page, https://www.atg.wa.gov/protecting-washingtonians-personal-health-data-and-privacy
11. Nevada SB 370 enrolled text, https://www.leg.state.nv.us/Session/82nd2023/Bills/SB/SB370_EN.pdf
12. Connecticut Public Act 23-56, https://www.cga.ct.gov/2023/ACT/PA/PDF/2023PA-00056-R00SB-00003-PA.PDF
13. GDPR Article 9, https://gdpr-info.eu/art-9-gdpr/
14. GDPR Article 3, https://gdpr-info.eu/art-3-gdpr/
15. GDPR Article 33, https://gdpr-info.eu/art-33-gdpr/
16. GDPR Article 83, https://gdpr-info.eu/art-83-gdpr/
17. ICO special category data, https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/what-is-special-category-data/
18. ICO conditions for processing, https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/what-are-the-conditions-for-processing/
19. California Civil Code 1798.140, https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=1798.140
20. CPPA FAQ, https://cppa.ca.gov/faq.html
21. WorkOS security, https://workos.com/security
22. WorkOS pricing, https://workos.com/pricing
23. WorkOS metadata, https://workos.com/docs/user-management/metadata
24. WorkOS User object, https://workos.com/docs/reference/user-management/user
25. Vercel compliance, https://vercel.com/docs/security/compliance
26. Vercel pricing, https://vercel.com/pricing
27. Vercel HIPAA guide, https://vercel.com/kb/guide/hipaa-compliance-guide-vercel
28. Vercel runtime logs, https://vercel.com/docs/logs/runtime
29. Supabase HIPAA compliance, https://supabase.com/docs/guides/security/hipaa-compliance
30. Supabase HIPAA projects, https://supabase.com/docs/guides/platform/hipaa-projects
31. Supabase pricing, https://supabase.com/pricing
32. Supabase security, https://supabase.com/security
33. Supabase row level security, https://supabase.com/docs/guides/database/postgres/row-level-security
34. Google Analytics consent mode, https://support.google.com/analytics/answer/9976101
