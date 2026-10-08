# DF TOOLS — Delta Force toolkit (Astro)

Unofficial fan-made calculator site for **Delta Force**, built per the Tool Website SEO Master Prompt.
Domain: **https://deltaforcetools.top** (each game project lives in its own folder under `Astro/`).

## Stack & commands

- Astro 5, static output, no client framework — vanilla JS islands inline per tool.
- `npm install` → `npm run dev` (local) → `npm run build` → deploy `dist/` to Netlify/Vercel/Cloudflare Pages/GitHub Pages.

## Pages (17)

| Type | URLs |
|---|---|
| Home | `/` |
| Tool hub | `/tools/` |
| Tools | `/ttk-calculator/`, `/ammo-chart/`, `/extraction-profit-calculator/`, `/loadout-cost-calculator/` |
| Guides | `/guides/how-ttk-works/`, `/guides/ammo-armor-tiers-explained/`, `/guides/extraction-profit-guide/` |
| Trust | `/about/`, `/contact/`, `/methodology/`, `/changelog/`, `/privacy/`, `/terms/` |
| Utility | `/sitemap/` (HTML), `/404`, `sitemap-index.xml` (generated), `robots.txt` |

## Single source of truth for game data

`src/data/game.ts` — tiers, penetration-by-gap table, defaults, calibers. **All tools read this file.**
Patch updates = edit this file, bump `lastVerified`, add a changelog entry, rebuild.

## [NEEDS DATA] / [VERIFY] checklist before public launch

Per the master prompt's "never invent facts" rule, these are labeled in code and must be resolved:

1. **Verify every game value in `src/data/game.ts`** against the current patch (pen table, blocked-damage share, hit multipliers, caliber tiers). The caliber table is placeholder guidance.
2. **About page** — replace the operator placeholder comment with a real name/bio (trust signal).
3. **Contact email** — `hello@deltaforcetools.top` is a placeholder; set up mailbox/forwarding.
4. **Analytics** — none by default. If adding GA4/Plausible, update `/privacy/` first and note it in the changelog.
5. **Domain** — point DNS at your host; `astro.config.mjs` `site` and `public/robots.txt` already use the production domain. Note: `.top` gives no ranking benefit (master prompt §7) — consider also owning the `.com` and 301-ing it.

## SEO implementation notes

- Titles ≤ ~60 chars, primary keyword first, brand last; unique metas per page.
- Server-rendered HTML everywhere (all content crawlable; results render client-side but every page's explanatory content is static).
- Canonicals from `Astro.site`, `trailingSlash: ignore`, clean URLs.
- JSON-LD: `WebSite` + `Organization` (home), `WebApplication` + `FAQPage` + `BreadcrumbList` (tools), `Article` (guides).
- Breadcrumbs on every page below home, marked up; footer = crawl path with all trust pages; no orphan pages (HTML sitemap links everything).
- After launch: submit `sitemap-index.xml` in Google Search Console + Bing Webmaster Tools.

## Adding a tool (pattern)

Copy any calculator page: form (`#calc`-style id), inline `<script>` reading `../data/game`, result panel with `.note` sourcing, FAQ, related-tools cards, `TrustBlock` + `ToolSchema`. Then add it to `/tools/`, home, footer, HTML sitemap.
