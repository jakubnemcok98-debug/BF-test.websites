# Landing Pages

Tracking sheet for standalone landing pages built for paid-ads traffic (Meta/Google), separate from the main site (`index.html`). Each page is a single self-contained HTML file (Tailwind CDN, inline styles), reusing brand assets from `../brand_assests/` and collecting leads through cal.com bookings (own event per page, so each page's bookings can have their own n8n workflow and sheet). The old form endpoint `/api/web-lead` is no longer used.

| Page | Path | Purpose / Angle | Language | Status | Created |
|---|---|---|---|---|---|
| AI Agents — general offer | `lp-ai-agents.html` | Meta Ads test, Czech Republic only, general "Custom AI Agents" positioning (all 5 agent types). Books via a cal.com modal (event `objevny-hovor-meta`), no form. | CS | Built. Meta Pixel loads only after cookie consent; privacy policy `zasady-ochrany-soukromi.html` and terms `podminky.html` written (20.09.2026). Bookings go through their own cal.com webhook to the n8n workflow "Lead Capture Landing Page - META ADS" → spreadsheet "Leads Meta Ads" (21.09.2026; separate from main-site leads). Local commit `ffb6b40` not yet pushed; the live page still opens `objevny-hovor` until it is pushed | 18.09.2026 |

## Conventions

- One file per landing page, named `lp-<angle-or-campaign>.html`.
- Reuse `../brand_assests/` for logos/images — never duplicate assets into this folder.
- Screenshot QA via `../screenshot-lp.mjs` (update the `url` inside it to point at the page being tested).
- Do not push to GitHub without explicit instruction — same rule as the rest of this site (see root `CLAUDE.md`).
