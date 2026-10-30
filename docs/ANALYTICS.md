# Analytics configuration

Google Analytics uses G-2TTJ25WSN8. Its loader queues Arguments objects, as Google's gtag snippet requires.
Previous Google-only consent is not reused: onco:analytics:v2 asks again, while preserving old refusals.
Both Google Analytics and PostHog wait for the existing analytics consent. Denial and Global Privacy Control
keep both unloaded; withdrawing consent stops further events.

Set these production and preview build variables in the existing Vercel OnCo project:

- NEXT_PUBLIC_POSTHOG_KEY: the OnCo PostHog project's public ingestion token (not a personal API key).
- NEXT_PUBLIC_POSTHOG_HOST: the project's ingestion host, such as https://us.i.posthog.com.

Without the public key PostHog stays disabled. The same deployment serves onco.cc and oncoopen.com;
pageview events retain the hostname to distinguish them. Canonical URLs stay on onco.cc.

PostHog collects only consented anonymous pageviews. It uses memory persistence, no person profiles,
no session recording, no automatic clicks/forms, no exception capture, no surveys and no feature flags.
The event filter strips query strings, fragments, referrers and all properties outside a small page/device
allowlist. No profile, saved cancer choices, searches, report text or account details are passed to PostHog.
Memory persistence means repeat visitors across browser restarts cannot reliably be deduplicated.

Verify in a fresh browser: no analytics before Allow, a pageview after Allow and on navigation,
no more pageviews after No thanks, then measurement resumes after Allow again. Test both public domains.
Use a generic public page for test visits; do not enter health information. Check the incoming pageview in
PostHog's live events and GA's realtime report. Historic missing visits cannot be backfilled.
