# maxdt88 HANDOFF (2026-11-05, Astra rebuild applied locally; live = v17 cube c5dff1a)

## State
- Repo C:\Users\maxdo\maxdt88-client-site, branch rebuild-reelhaus. origin/main = c5dff1a (v17 cube, LIVE on maxdt88.com, Vercel auto-deploys main; rollback = d700bf0).
- Local commits NOT pushed: 3766e34 GA4 -> G-CF9GEG390R (hardcoded in consent-analytics.tsx, consent-gated); 5180e2f Astra rebuild.
- Astra rebuild (from Downloads/maxdt88-site-2026-11-05.zip; report refs/astra-2026-11-05/QA-REPORT.md): cube removed, 10 software tiles + description panel (software-tiles.tsx), hero copy + "See client work", Wyatt edit 02, platform-link icons, About copy, local Inter fonts (src/assets), TS validation on, scripts/dev.mjs.
- Local preview: `npx next start -p 3090` (production build of 5180e2f). Screens refs/astra-2026-11-05/astra-*.jpg: 0 errors, no overflow at 1440/390.
- Push procedure: gh auth switch -u maximetdoucet-glitch; commit-tree HEAD^{tree} -p origin/main -p HEAD; git push origin <sha>:refs/heads/main; switch back to gmaxmediade-lang; poll maxdt88.com.

## Next step
- Max reviews the local preview, then gives go to push (Astra + GA). After push: check live tiles + G-CF9GEG390R in bundle.

## Open
- Max's verdict on Astra's tiles vs the cube (cube restorable from c5dff1a / 88965f0).
- Wyatt 02 90K+ and SilvaParas ~3K counts omitted by Astra: need Max's screenshots.
- Real-phone touch + reduced-motion check; motion feel UNVERIFIED.
- Astra's zip had 3 partial hidden video temp files (skipped).
- Older: spacing pill/H1/CTA, Lionsgate card, "Independent edits" heading, remove variants B/C, old webp/mp4 deletions.
