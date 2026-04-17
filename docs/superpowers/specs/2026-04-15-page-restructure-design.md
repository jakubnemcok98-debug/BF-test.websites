# Page Restructure Design — 15.04.2026

## Context

The Bohemian Flow website currently has 6 sections below the hero (Mission, Pillars, Stats, Topics, Join CTA, Footer). The user wants to simplify the page to feel more personal and conversion-focused — inspired by uppitai.com — by replacing the existing marketing sections with three new sections: a process walkthrough, social proof, and a personal introduction.

## Decision

Remove most existing sections between hero and footer. Keep the Topics (automation specializations) section. Add three new sections in this order:
1. **How we work** — process transparency, builds trust
2. **Our automation specializations** — kept as-is
3. **Client Reviews** — social proof
4. **About me** — personal credibility

## Final Page Structure

```
Hero                              (unchanged)
How we work                       (new)
Our automation specializations    (unchanged — #topics)
Client Reviews                    (new)
About me                          (new)
Footer                            (unchanged)
```

**Sections removed:** `#mission`, `#pillars`, `#stats-section`, `#join`

---

## Section Specs

### 1. How we work

**Layout:** Horizontal 4-step timeline on desktop, vertical stack on mobile.

**Structure:**
- Section heading: "How we work" (or i18n equivalent)
- 4 steps in a row, connected by an orange horizontal line
- Each step: orange numbered circle → step title (bold white) → short description (muted gray)

**Steps:**
| # | Title | Description |
|---|-------|-------------|
| 1 | Discovery Call | Understand your business, goals, and current tools |
| 2 | Audit & Plan | Map your workflows and identify automation opportunities |
| 3 | Build & Test | Build and test your custom automations |
| 4 | Deploy & Support | Launch, monitor, and iterate |

**Styling:** Matches existing design system — navy background (`#0D1F3C`), orange accent (`#F5A800`), Rajdhani/Exo 2 headings, Inter body text. Uses existing `.reveal` scroll animation class.

**i18n:** Add EN and CS translation keys for section heading, step titles, and descriptions.

---

### 2. Client Reviews

**Layout:** 3 cards in a horizontal row on desktop (`grid-cols-3`), single column on mobile.

**Each card contains:**
- Large open-quote character (orange)
- Review quote text (placeholder)
- ★★★★★ star rating
- Reviewer name (placeholder)
- Company (placeholder)

**Placeholder content:**

| Card | Quote | Name | Company |
|------|-------|------|---------|
| 1 | "Bohemian Flow automated our entire lead pipeline in under two weeks. ROI was immediate." | Jan Novák | CEO, TechStart s.r.o. |
| 2 | "Finally someone who actually delivers. Our n8n workflows run flawlessly." | Sarah Mitchell | Operations Manager, Growly |
| 3 | "Jakub built exactly what we needed — no fluff, just results." | Martin Dvořák | Founder, Scalable.io |

**Styling:** Cards use existing `.card-hover` class and navy card background. Orange quote mark as decorative element.

**i18n:** Add translation keys for section heading and all placeholder content.

---

### 3. About me

**Layout:** Two-column on desktop — photo left, text right. Single column on mobile (photo top, text below).

**Left column:**
- Circular image placeholder (gray circle with camera icon) — user will swap in real photo later
- Image has `id="about-photo"` for easy targeting

**Right column:**
- Small eyebrow label: "About me"
- Name heading (placeholder: "Jakub")
- Bio paragraph (2–3 sentences, placeholder copy about founding Bohemian Flow)
- Two link buttons: Email (links to existing contact action) and LinkedIn (placeholder `#`)

**Placeholder bio:**
> "I'm Jakub, founder of Bohemian Flow. I help businesses escape manual work by building custom AI automations and intelligent workflows. If it's repetitive, we automate it."

**Styling:** Consistent with rest of page. Photo uses a rounded border with subtle orange glow on hover.

**i18n:** Add translation keys for label, bio text, and button labels.

---

## Implementation Notes

- All changes are in `index.html` (single-file site, ~1190 lines)
- Translation strings added to `translations/en.js` and `translations/cs.js`
- Existing CSS classes to reuse: `.reveal`, `.reveal-delay-*`, `.card-hover`, `.btn-primary`, `.btn-ghost`, `.text-gradient-orange`, `section` padding variables
- No new dependencies required
- Existing navbar links will need updating — remove links to deleted sections, add links to new ones (`#how-we-work`, `#reviews`, `#about`)

## Verification

1. Start dev server: `node serve.mjs`
2. Open `http://localhost:3000`
3. Confirm hero is unchanged
4. Scroll down — verify 3 new sections appear in correct order
5. Check removed sections (Mission, Pillars, Stats, Join CTA) are gone; Topics section is still present
6. Resize to mobile — verify horizontal timeline stacks vertically
7. Toggle language (EN/CZ) — verify all new text translates correctly
8. Check scroll reveal animations trigger on all new sections
