# Page Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Bohemian Flow homepage from 6 sections to 4 — removing Mission, Pillars, Stats, and Join CTA; keeping Topics; and adding How We Work, Client Reviews, and About Me.

**Architecture:** All changes are in three files: `index.html` (HTML structure), `translations/en.js` (English strings), and `translations/cs.js` (Czech strings). The site uses a custom `data-i18n` attribute system — every user-visible string must have a translation key in both files. No build step; verify by opening the browser.

**Tech Stack:** Vanilla HTML, Tailwind CSS (CDN), CSS custom properties, custom i18n via `data-i18n` attributes loaded from `translations/en.js` and `translations/cs.js`.

---

> **Note on TDD:** This is a static HTML/CSS site with no test framework. Each task ends with a visual verification step in the browser instead of a test run. Start the dev server once (`node serve.mjs`) and keep it running — just refresh after each task.

---

## File Map

| File | Changes |
|------|---------|
| `translations/en.js` | Add keys: `howWeWork.*`, `reviews.*`, `about.*`; remove: `mission.*`, `pillars.*`, `stats.*`, `cta.*`; update `nav.*`, `footer.*` |
| `translations/cs.js` | Same structure as en.js, Czech text |
| `index.html` | Remove 4 sections (lines 484–728); add 3 new sections; update navbar and footer links |

---

## Task 1: Add EN translation keys for new sections

**Files:**
- Modify: `translations/en.js`

- [ ] **Step 1: Remove unused keys and add new keys**

Open `translations/en.js`. Replace the entire `mission`, `pillars`, `stats`, and `cta` blocks, and update `nav` and `footer`. The final file should look like this (keep `page`, `hero`, `topics`, `modal`, `form` blocks unchanged):

```js
window.translations = window.translations || {};
window.translations.en = {
  page: {
    title: 'Bohemian Flow — AI Consulting & Automation Agency'
  },
  nav: {
    howWeWork: 'How We Work',
    work:      'Specializations',
    about:     'About',
    cta:       'Get a Quote →'
  },
  hero: {
    eyebrow:      '◈ AI Consulting & Automation Agency',
    heading:      'We Build the AI Systems That <span class="text-gradient-orange">Scale Your Business</span>',
    subheading:   'We design and implement intelligent automation workflows, AI agents, and lead generation systems that replace manual work, accelerate growth, and give your team superpowers.',
    cta_primary:  'Get a Free Consultation →',
    cta_secondary:'See Our Work ↓',
    social_proof: '200+ workflows delivered · Czech-based · Available globally'
  },
  howWeWork: {
    label:   'Our Process',
    heading: 'How We Work',
    step1_title: 'Discovery Call',
    step1_desc:  'We understand your business, goals, and the tools you currently use.',
    step2_title: 'Audit & Plan',
    step2_desc:  'We map your workflows and identify the highest-leverage automation opportunities.',
    step3_title: 'Build & Test',
    step3_desc:  'We build and rigorously test your custom automations before they touch production.',
    step4_title: 'Deploy & Support',
    step4_desc:  'We launch, monitor, and iterate — with ongoing support included.'
  },
  topics: {
    label:   'What We Build',
    heading: 'Our Automation Specializations',
    t1: { tag: 'Workflow', title: 'n8n & Make Workflows',       desc: 'Deep-dive automation builds and advanced node configurations.' },
    t2: { tag: 'Agents',   title: 'AI Agent Architecture',      desc: 'Multi-step agent design patterns and orchestration.' },
    t3: { tag: 'LeadGen',  title: 'Lead Generation Systems',    desc: 'Outbound automation, enrichment, and conversion flows.' },
    t4: { tag: 'CRM',      title: 'CRM Automation',             desc: 'Pipedrive, HubSpot, Close.io, and custom integrations.' },
    t5: { tag: 'Prompts',  title: 'Prompt Engineering',         desc: 'Production-grade prompt systems and advanced techniques.' },
    t6: { tag: 'Data',     title: 'Scraping & Data Pipelines',  desc: 'Web data collection and large-scale processing.' },
    t7: { tag: 'Chat',     title: 'Voice & Chat Interfaces',    desc: 'WhatsApp, Telegram, Slack bots, and conversational AI.' },
    t8: { tag: 'Process',  title: 'Business Process Design',    desc: 'SOP to automation conversion and optimization.' }
  },
  reviews: {
    label:   'Client Reviews',
    heading: 'What Clients Say',
    r1_quote:   'Bohemian Flow automated our entire lead pipeline in under two weeks. ROI was immediate.',
    r1_name:    'Jan Novák',
    r1_company: 'CEO, TechStart s.r.o.',
    r2_quote:   'Finally someone who actually delivers. Our n8n workflows run flawlessly.',
    r2_name:    'Sarah Mitchell',
    r2_company: 'Operations Manager, Growly',
    r3_quote:   'Jakub built exactly what we needed — no fluff, just results.',
    r3_name:    'Martin Dvořák',
    r3_company: 'Founder, Scalable.io'
  },
  about: {
    label:      'About Me',
    heading:    'Jakub',
    bio:        "I'm Jakub, founder of Bohemian Flow. I help businesses escape manual work by building custom AI automations and intelligent workflows. If it's repetitive, we automate it.",
    cta_email:  'Send an Email',
    cta_linkedin: 'LinkedIn'
  },
  footer: {
    tagline:          'AI consulting & automation agency. We build the systems that scale your business.',
    services_heading: 'Navigate',
    service1:         'How We Work',
    service2:         'Specializations',
    service3:         'About',
    service4:         'Get a Quote',
    company_heading:  'Company',
    company1:         'Case Studies',
    company2:         'Blog',
    company3:         'Privacy',
    company4:         'Terms',
    connect_heading:  'Connect',
    copyright:        '© 2026 Bohemian Flow AI',
    privacy:          'Privacy',
    terms:            'Terms'
  },
  modal: {
    badge: 'Free Consultation',
    title: 'Book an AI Consulting Call',
    close_aria: 'Close'
  },
  form: {
    name_label:         'Name',
    email_label:        'Email',
    company_label:      'Company / Business',
    goal_label:         'What do you want to automate?',
    budget_label:       'Budget Range',
    timing_label:       'Preferred Meeting Time',
    name_placeholder:   'Jane Smith',
    email_placeholder:  'jane@company.com',
    company_placeholder:'Acme Corp (optional)',
    goal_placeholder:   "Describe the process or workflow you'd like to automate...",
    timing_placeholder: 'e.g. Mornings, CET',
    budget_default:     'Select range',
    budget_under5k:     'Under €5k',
    budget_5k20k:       '€5k – €20k',
    budget_20kplus:     '€20k+',
    budget_unsure:      'Not sure yet',
    submit:             'Request Free Consultation →',
    sending:            'Sending…',
    error_required:     'Please fill in all required fields.',
    error_generic:      'Something went wrong. Please try again or email us directly.',
    success_heading:    "You're on the list!",
    success_body:       "We'll be in touch within 24 hours to schedule your free scoping call."
  }
};
```

- [ ] **Step 2: Verify**

Open `translations/en.js` and confirm:
- Keys `mission`, `pillars`, `stats`, `cta` are gone
- Keys `howWeWork`, `reviews`, `about` are present
- `nav` has `howWeWork`, `work`, `about`, `cta`

---

## Task 2: Add CS translation keys for new sections

**Files:**
- Modify: `translations/cs.js`

- [ ] **Step 1: Replace the entire file**

```js
window.translations = window.translations || {};
window.translations.cs = {
  page: {
    title: 'Bohemian Flow — AI Konzultace & Automatizační Agentura'
  },
  nav: {
    howWeWork: 'Jak pracujeme',
    work:      'Specializace',
    about:     'O mně',
    cta:       'Získat nabídku →'
  },
  hero: {
    eyebrow:      '◈ AI Konzultace & Automatizační Agentura',
    heading:      'Stavíme AI systémy, které <span class="text-gradient-orange">škálují vaše podnikání</span>',
    subheading:   'Navrhujeme a implementujeme inteligentní automatizační workflows, AI agenty a systémy pro generování leadů — nahrazujeme manuální práci, urychlujeme růst a dáváme vašemu týmu superschopnosti.',
    cta_primary:  'Získat bezplatnou konzultaci →',
    cta_secondary:'Zobrazit naše práce ↓',
    social_proof: '200+ workflows · Česká firma · Globální dostupnost'
  },
  howWeWork: {
    label:   'Náš proces',
    heading: 'Jak pracujeme',
    step1_title: 'Discovery call',
    step1_desc:  'Poznáme vaše podnikání, cíle a nástroje, které aktuálně používáte.',
    step2_title: 'Audit & plán',
    step2_desc:  'Zmapujeme vaše workflows a identifikujeme příležitosti s nejvyšší pákou.',
    step3_title: 'Stavba & testování',
    step3_desc:  'Postavíme a důkladně otestujeme vaše automatizace, než se dotknou produkce.',
    step4_title: 'Nasazení & podpora',
    step4_desc:  'Spustíme, monitorujeme a iterujeme — průběžná podpora je součástí.'
  },
  topics: {
    label:   'Co stavíme',
    heading: 'Naše automatizační specializace',
    t1: { tag: 'Workflow', title: 'n8n & Make Workflows',         desc: 'Pokročilé automatizační buildy a konfigurace uzlů.' },
    t2: { tag: 'Agenti',   title: 'Architektura AI agentů',       desc: 'Vzory pro víceúrovňové agenty a orchestraci.' },
    t3: { tag: 'LeadGen',  title: 'Systémy pro generování leadů', desc: 'Outbound automatizace, obohacování a konverzní toky.' },
    t4: { tag: 'CRM',      title: 'Automatizace CRM',             desc: 'Pipedrive, HubSpot, Close.io a vlastní integrace.' },
    t5: { tag: 'Prompty',  title: 'Prompt Engineering',           desc: 'Produkční promptovací systémy a pokročilé techniky.' },
    t6: { tag: 'Data',     title: 'Scraping & datové pipeline',   desc: 'Sběr webových dat a velkoobjemové zpracování.' },
    t7: { tag: 'Chat',     title: 'Hlasová & chatová rozhraní',   desc: 'WhatsApp, Telegram, Slack boty a konverzační AI.' },
    t8: { tag: 'Procesy',  title: 'Design firemních procesů',     desc: 'Převod SOP na automatizace a optimalizace.' }
  },
  reviews: {
    label:   'Reference klientů',
    heading: 'Co říkají klienti',
    r1_quote:   'Bohemian Flow automatizoval celý náš lead pipeline za méně než dva týdny. ROI bylo okamžité.',
    r1_name:    'Jan Novák',
    r1_company: 'CEO, TechStart s.r.o.',
    r2_quote:   'Konečně někdo, kdo opravdu dodává. Naše n8n workflows běží bezchybně.',
    r2_name:    'Sarah Mitchell',
    r2_company: 'Operations Manager, Growly',
    r3_quote:   'Jakub postavil přesně to, co jsme potřebovali — žádný fluff, jen výsledky.',
    r3_name:    'Martin Dvořák',
    r3_company: 'Founder, Scalable.io'
  },
  about: {
    label:        'O mně',
    heading:      'Jakub',
    bio:          'Jsem Jakub, zakladatel Bohemian Flow. Pomáhám firmám zbavit se manuální práce díky vlastním AI automatizacím a inteligentním workflows. Pokud se to opakuje, automatizujeme to.',
    cta_email:    'Napsat e-mail',
    cta_linkedin: 'LinkedIn'
  },
  footer: {
    tagline:          'AI konzultace & automatizační agentura. Stavíme systémy, které škálují vaše podnikání.',
    services_heading: 'Navigace',
    service1:         'Jak pracujeme',
    service2:         'Specializace',
    service3:         'O mně',
    service4:         'Získat nabídku',
    company_heading:  'Společnost',
    company1:         'Případové studie',
    company2:         'Blog',
    company3:         'Ochrana soukromí',
    company4:         'Podmínky',
    connect_heading:  'Kontakt',
    copyright:        '© 2026 Bohemian Flow AI',
    privacy:          'Ochrana soukromí',
    terms:            'Podmínky'
  },
  modal: {
    badge:      'Bezplatná konzultace',
    title:      'Rezervovat AI konzultační hovor',
    close_aria: 'Zavřít'
  },
  form: {
    name_label:         'Jméno',
    email_label:        'E-mail',
    company_label:      'Firma / Podnikání',
    goal_label:         'Co chcete automatizovat?',
    budget_label:       'Rozpočet',
    timing_label:       'Preferovaný čas schůzky',
    name_placeholder:   'Jana Nováková',
    email_placeholder:  'jana@firma.cz',
    company_placeholder:'Acme s.r.o. (volitelné)',
    goal_placeholder:   'Popište proces nebo workflow, který chcete automatizovat...',
    timing_placeholder: 'např. Dopoledne, CET',
    budget_default:     'Vybrat rozsah',
    budget_under5k:     'Do €5k',
    budget_5k20k:       '€5k – €20k',
    budget_20kplus:     '€20k+',
    budget_unsure:      'Zatím nevím',
    submit:             'Požádat o bezplatnou konzultaci →',
    sending:            'Odesílám…',
    error_required:     'Vyplňte prosím všechna povinná pole.',
    error_generic:      'Něco se pokazilo. Zkuste to prosím znovu nebo nám napište přímo.',
    success_heading:    'Jsme na to!',
    success_body:       'Ozveme se do 24 hodin a naplánujeme bezplatný scoping call.'
  }
};
```

- [ ] **Step 2: Verify**

Open `translations/cs.js` and confirm keys match the structure in `en.js`.

---

## Task 3: Remove old sections from index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Remove the Mission section**

In `index.html`, delete lines 484–536 (the entire `<section id="mission">` block, from the opening `<section` tag to its closing `</section>` tag inclusive). The comment `<!-- PILLARS SECTION -->` on line 538 should now immediately follow the closing `</section>` of the hero.

- [ ] **Step 2: Remove the Pillars section**

Delete the entire `<section id="pillars">` block (originally lines 539–584, comment + section).

- [ ] **Step 3: Remove the Stats section**

Delete the entire `<section id="stats-section">` block (originally lines 586–610, comment + section).

- [ ] **Step 4: Remove the Join CTA section**

Delete the entire `<section id="join">` block (originally lines 682–728, comment + section).

- [ ] **Step 5: Visual check**

Start the dev server if not running: `node serve.mjs`
Open `http://localhost:3000`. Scroll past the hero — you should see only the Topics (Automation Specializations) section and then the footer. The Mission, Pillars, Stats, and Join CTA sections must be gone.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: remove mission, pillars, stats, join CTA sections"
```

---

## Task 4: Add How We Work section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert section HTML**

In `index.html`, find the `<!-- TOPICS SECTION -->` comment (which now follows the hero directly). Insert the following block immediately **before** that comment:

```html
  <!-- HOW WE WORK SECTION -->
  <section id="how-we-work" class="py-20 md:py-28 px-6 md:px-12 bg-navy">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <p class="text-orange font-display font-semibold uppercase tracking-widest text-xs mb-3" data-i18n="howWeWork.label">Our Process</p>
        <h2 class="text-white font-display font-bold" style="font-size: var(--text-section); line-height: 1.1;" data-i18n="howWeWork.heading">How We Work</h2>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Connecting line (desktop only) -->
        <div class="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-orange/30" style="top: 2rem;"></div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 relative z-10">
          <!-- Step 1 -->
          <div class="flex flex-col items-center text-center reveal reveal-delay-1">
            <div class="w-16 h-16 rounded-full bg-orange flex items-center justify-center font-display font-bold text-navy text-2xl mb-6 shadow-orange flex-shrink-0">1</div>
            <h3 class="text-white font-display font-bold text-lg md:text-xl mb-3" data-i18n="howWeWork.step1_title">Discovery Call</h3>
            <p class="text-ghost text-sm leading-6" data-i18n="howWeWork.step1_desc">We understand your business, goals, and the tools you currently use.</p>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center text-center reveal reveal-delay-2">
            <div class="w-16 h-16 rounded-full bg-orange flex items-center justify-center font-display font-bold text-navy text-2xl mb-6 shadow-orange flex-shrink-0">2</div>
            <h3 class="text-white font-display font-bold text-lg md:text-xl mb-3" data-i18n="howWeWork.step2_title">Audit & Plan</h3>
            <p class="text-ghost text-sm leading-6" data-i18n="howWeWork.step2_desc">We map your workflows and identify the highest-leverage automation opportunities.</p>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center text-center reveal reveal-delay-3">
            <div class="w-16 h-16 rounded-full bg-orange flex items-center justify-center font-display font-bold text-navy text-2xl mb-6 shadow-orange flex-shrink-0">3</div>
            <h3 class="text-white font-display font-bold text-lg md:text-xl mb-3" data-i18n="howWeWork.step3_title">Build & Test</h3>
            <p class="text-ghost text-sm leading-6" data-i18n="howWeWork.step3_desc">We build and rigorously test your custom automations before they touch production.</p>
          </div>

          <!-- Step 4 -->
          <div class="flex flex-col items-center text-center reveal reveal-delay-4">
            <div class="w-16 h-16 rounded-full bg-orange flex items-center justify-center font-display font-bold text-navy text-2xl mb-6 shadow-orange flex-shrink-0">4</div>
            <h3 class="text-white font-display font-bold text-lg md:text-xl mb-3" data-i18n="howWeWork.step4_title">Deploy & Support</h3>
            <p class="text-ghost text-sm leading-6" data-i18n="howWeWork.step4_desc">We launch, monitor, and iterate — with ongoing support included.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

```

- [ ] **Step 2: Visual check**

Refresh `http://localhost:3000`. Scroll down past the hero — you should see:
1. "How We Work" section with 4 orange numbered circles connected by a line on desktop
2. Topics section below it

On mobile (resize window < 768px): circles stack vertically, connecting line is hidden.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add How We Work section with 4-step horizontal timeline"
```

---

## Task 5: Add Client Reviews section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert section HTML**

Find the `<!-- FOOTER -->` comment in `index.html`. Insert the following block immediately **before** that comment:

```html
  <!-- REVIEWS SECTION -->
  <section id="reviews" class="py-20 md:py-28 px-6 md:px-12 bg-navy border-t border-orange/10">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <p class="text-orange font-display font-semibold uppercase tracking-widest text-xs mb-3" data-i18n="reviews.label">Client Reviews</p>
        <h2 class="text-white font-display font-bold" style="font-size: var(--text-section); line-height: 1.1;" data-i18n="reviews.heading">What Clients Say</h2>
      </div>

      <!-- Review Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <!-- Review 1 -->
        <div class="card-hover bg-navy-light rounded-2xl p-8 reveal reveal-delay-1 flex flex-col">
          <span class="text-orange font-display font-bold text-5xl leading-none mb-4">"</span>
          <p class="text-ghost leading-7 flex-1" data-i18n="reviews.r1_quote">Bohemian Flow automated our entire lead pipeline in under two weeks. ROI was immediate.</p>
          <div class="mt-6 pt-6 border-t border-white/10">
            <div class="flex items-center gap-1 text-orange text-sm mb-2">★★★★★</div>
            <p class="text-white font-semibold text-sm" data-i18n="reviews.r1_name">Jan Novák</p>
            <p class="text-ghost text-xs mt-0.5" data-i18n="reviews.r1_company">CEO, TechStart s.r.o.</p>
          </div>
        </div>

        <!-- Review 2 -->
        <div class="card-hover bg-navy-light rounded-2xl p-8 reveal reveal-delay-2 flex flex-col">
          <span class="text-orange font-display font-bold text-5xl leading-none mb-4">"</span>
          <p class="text-ghost leading-7 flex-1" data-i18n="reviews.r2_quote">Finally someone who actually delivers. Our n8n workflows run flawlessly.</p>
          <div class="mt-6 pt-6 border-t border-white/10">
            <div class="flex items-center gap-1 text-orange text-sm mb-2">★★★★★</div>
            <p class="text-white font-semibold text-sm" data-i18n="reviews.r2_name">Sarah Mitchell</p>
            <p class="text-ghost text-xs mt-0.5" data-i18n="reviews.r2_company">Operations Manager, Growly</p>
          </div>
        </div>

        <!-- Review 3 -->
        <div class="card-hover bg-navy-light rounded-2xl p-8 reveal reveal-delay-3 flex flex-col">
          <span class="text-orange font-display font-bold text-5xl leading-none mb-4">"</span>
          <p class="text-ghost leading-7 flex-1" data-i18n="reviews.r3_quote">Jakub built exactly what we needed — no fluff, just results.</p>
          <div class="mt-6 pt-6 border-t border-white/10">
            <div class="flex items-center gap-1 text-orange text-sm mb-2">★★★★★</div>
            <p class="text-white font-semibold text-sm" data-i18n="reviews.r3_name">Martin Dvořák</p>
            <p class="text-ghost text-xs mt-0.5" data-i18n="reviews.r3_company">Founder, Scalable.io</p>
          </div>
        </div>
      </div>
    </div>
  </section>

```

- [ ] **Step 2: Visual check**

Refresh `http://localhost:3000`. Scroll to the bottom — you should see:
- 3 review cards with orange quote marks, star ratings, names and companies
- Cards are equal height (flex layout pins the reviewer info to the bottom)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Client Reviews section with 3 placeholder cards"
```

---

## Task 6: Add About Me section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert section HTML**

Find the `<!-- REVIEWS SECTION -->` comment you just added. Insert the following block immediately **after** the closing `</section>` of the reviews section and **before** the `<!-- FOOTER -->` comment:

```html
  <!-- ABOUT SECTION -->
  <section id="about" class="py-20 md:py-28 px-6 md:px-12 bg-navy border-t border-orange/10">
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- Photo -->
        <div class="reveal flex justify-center md:justify-start">
          <div id="about-photo" class="w-56 h-56 md:w-72 md:h-72 rounded-full bg-navy-light border-2 border-orange/30 flex items-center justify-center overflow-hidden hover:border-orange/60 transition-colors duration-300" style="box-shadow: 0 0 0 0 rgba(245,168,0,0); transition: box-shadow 0.3s ease;">
            <!-- Replace the div below with an <img> tag when photo is ready -->
            <!-- Example: <img src="./brand_assests/jakub.jpg" alt="Jakub" class="w-full h-full object-cover" /> -->
            <svg viewBox="0 0 100 100" class="w-24 h-24 text-ghost opacity-20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="38" r="18"/>
              <ellipse cx="50" cy="80" rx="30" ry="20"/>
            </svg>
          </div>
        </div>

        <!-- Text -->
        <div class="reveal reveal-delay-1">
          <p class="text-orange font-display font-semibold uppercase tracking-widest text-xs mb-4" data-i18n="about.label">About Me</p>
          <h2 class="text-white font-display font-bold mb-6" style="font-size: var(--text-section); line-height: 1.1;" data-i18n="about.heading">Jakub</h2>
          <p class="text-ghost leading-8 mb-8" data-i18n="about.bio">I'm Jakub, founder of Bohemian Flow. I help businesses escape manual work by building custom AI automations and intelligent workflows. If it's repetitive, we automate it.</p>
          <div class="flex flex-wrap gap-4">
            <a href="mailto:hello@bohemianflow.ai" class="btn-primary text-sm" data-i18n="about.cta_email">Send an Email</a>
            <a href="#" class="btn-ghost text-sm" data-i18n="about.cta_linkedin">LinkedIn</a>
          </div>
        </div>

      </div>
    </div>
  </section>

```

- [ ] **Step 2: Visual check**

Refresh `http://localhost:3000`. Scroll near the footer — you should see:
- A circular photo placeholder (person silhouette) on the left
- Name "Jakub", bio paragraph, and two buttons on the right
- On mobile: photo stacks above text

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add About Me section with photo placeholder and bio"
```

---

## Task 7: Update navbar and footer links

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update desktop navbar links**

Find the desktop nav block (around the original line 383–393). Replace the three nav links with:

```html
      <a href="#how-we-work" class="text-sm font-medium text-ghost hover:text-orange transition-colors" data-i18n="nav.howWeWork">How We Work</a>
      <a href="#topics" class="text-sm font-medium text-ghost hover:text-orange transition-colors" data-i18n="nav.work">Specializations</a>
      <a href="#about" class="text-sm font-medium text-ghost hover:text-orange transition-colors" data-i18n="nav.about">About</a>
```

- [ ] **Step 2: Update mobile navbar links**

Find the mobile menu block (inside `<div id="mobile-menu">`). Replace the three nav links with:

```html
      <a href="#how-we-work" class="text-sm font-medium text-ghost hover:text-orange" data-i18n="nav.howWeWork">How We Work</a>
      <a href="#topics" class="text-sm font-medium text-ghost hover:text-orange" data-i18n="nav.work">Specializations</a>
      <a href="#about" class="text-sm font-medium text-ghost hover:text-orange" data-i18n="nav.about">About</a>
```

- [ ] **Step 3: Update footer links**

Find the footer section. Replace the Services column `<ul>` and Company column `<ul>` with:

```html
        <!-- Column 2: Navigate -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider" data-i18n="footer.services_heading">Navigate</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#how-we-work" class="text-ghost hover:text-orange transition-colors" data-i18n="footer.service1">How We Work</a></li>
            <li><a href="#topics" class="text-ghost hover:text-orange transition-colors" data-i18n="footer.service2">Specializations</a></li>
            <li><a href="#about" class="text-ghost hover:text-orange transition-colors" data-i18n="footer.service3">About</a></li>
            <li><a href="#" onclick="openQuoteModal(); return false;" class="text-ghost hover:text-orange transition-colors" data-i18n="footer.service4">Get a Quote</a></li>
          </ul>
        </div>

        <!-- Column 3: Company -->
        <div>
          <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider" data-i18n="footer.company_heading">Company</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="text-ghost hover:text-orange transition-colors" data-i18n="footer.company1">Case Studies</a></li>
            <li><a href="#" class="text-ghost hover:text-orange transition-colors" data-i18n="footer.company2">Blog</a></li>
            <li><a href="#" class="text-ghost hover:text-orange transition-colors" data-i18n="footer.company3">Privacy</a></li>
            <li><a href="#" class="text-ghost hover:text-orange transition-colors" data-i18n="footer.company4">Terms</a></li>
          </ul>
        </div>
```

- [ ] **Step 4: Visual check**

Refresh `http://localhost:3000`. Check:
- Desktop navbar shows: "How We Work", "Specializations", "About", language toggle, "Get a Quote" button
- Clicking each nav link scrolls to the correct section
- Mobile hamburger menu shows the same 3 links
- Footer "Navigate" column links to `#how-we-work`, `#topics`, `#about`
- Switch language to CZ — all new section text translates correctly

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: update navbar and footer links for new page structure"
```

---

## Final Verification

- [ ] Open `http://localhost:3000` and scroll the full page top to bottom
- [ ] Confirm page order: Hero → How We Work → Specializations → Reviews → About Me → Footer
- [ ] Resize to mobile — timeline steps stack vertically, about section stacks photo above text
- [ ] Switch language EN → CZ — all new section content translates (no English text leaking through)
- [ ] Click "Get a Quote" in navbar — quote modal opens correctly
- [ ] No console errors in browser DevTools
