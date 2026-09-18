# Landing Pages

Tracking sheet for standalone landing pages built for paid-ads traffic (Meta/Google), separate from the main site (`index.html`). Each page is a single self-contained HTML file (Tailwind CDN, inline styles), reusing brand assets from `../brand_assests/` and submitting to the shared `/api/web-lead` endpoint.

| Page | Path | Purpose / Angle | Language | Status | Created |
|---|---|---|---|---|---|
| AI Agents — general offer | `lp-ai-agents.html` | Meta Ads test, Czech Republic only, general "Custom AI Agents" positioning (all 5 agent types). Trimmed lead form (name + email required only). | CS | Built, not yet live — blocked on Meta Pixel ID | 18.09.2026 |

## Conventions

- One file per landing page, named `lp-<angle-or-campaign>.html`.
- Reuse `../brand_assests/` for logos/images — never duplicate assets into this folder.
- Screenshot QA via `../screenshot-lp.mjs` (update the `url` inside it to point at the page being tested).
- Do not push to GitHub without explicit instruction — same rule as the rest of this site (see root `CLAUDE.md`).
