# Security Policy

## Scope

OnCo is a statically exported website with no server, database, accounts, or user data. The only client-side state is a browser-local profile (cancer type, biomarkers, prior lines) that never leaves the device. Pages call third-party APIs only on explicit user action (ClinicalTrials.gov for live trial lookups; Nominatim for postcode geocoding in the trial finder).

Things in scope for a security report:

- Cross-site scripting or injection through corpus content, search, URL parameters, or the embed pages.
- Dependency vulnerabilities with a realistic path to exploitation in a static site.
- Leaked secrets or personal data in the repository or its history.
- Problems in the GitHub Actions workflows (permissions, supply chain).
- Misleading content that could cause harm is not a security issue; report it as a fact correction through the issue templates or "Suggest an edit" on the page.

## Reporting

Please use GitHub's private vulnerability reporting on this repository ("Security" tab → "Report a vulnerability"). If that is unavailable, open an issue titled "Security: contact requested" without details and a maintainer will reach out.

We aim to acknowledge reports within 7 days and to fix or mitigate confirmed issues within 30 days. Credit is given in the changelog unless you prefer otherwise.

## Supported versions

Only the current `main` branch and the live deployment are supported.
