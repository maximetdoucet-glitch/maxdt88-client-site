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

## Update 2026-11-05 late (commits 8b0f5eb, 9cca160, e379352, local, NOT pushed)
- Hero: full screen (min-h 100svh-82px header), H1 "Short & long form video editing." (2 lines desktop), 48px gap tiles to H1, subline then trial line + Contact stacked under it, left aligned.
- View chips on the videos (bottom right, same Views pill): Wyatt 01 "1.1M+ views", Wyatt 02 "90K+ views" (smaller chip, frame 125px), SilvaParas "3K views". Removed the "1.1M+ YouTube views" text line.
- SilvaParas hover-play works in Playwright (paused false, readyState 4); Max reported he could not hover it, cause UNKNOWN.
- OPEN: subline still says "Long-form edits are available too." (redundant with new H1, wording is Max's call); Max's verdict on hero; go to push.

## LIVE 2026-11-05 (Max go): main = e4418e3 on maxdt88.com
- Live has Astra package, GA4 G-CF9GEG390R (verified in layout chunk), H1 "Short & long form video editing." one line at 1440 (clamp 52px/4.8vw/80px), 80px gap tiles to H1, CTA under subline, view chips 1.1M / 90K / 3K (no plus).
- OPEN: subline "Long-form edits are available too." redundant with H1 (Max's wording call); SilvaParas hover issue not reproduced; phone 202px gap tiles to H1; real-phone check.

## 2026-11-05 late
- Subline sentence "Long-form edits are available too." removed (commit 6913beb on rebuild-reelhaus). NOT live yet: needs Max go, then the usual push procedure.

## 2026-11-06
- Software descriptions pass (7 entries, Max's text verbatim) committed on rebuild-reelhaus; build OK; QA 10 tiles x 1440/390: no clipping, no page overflow, 0 console errors. NOT live: needs Max go (with 6913beb).
- Panel height now varies per tool (1440: 174-204px, 390: 110-162px), so content below shifts on click. Fix only if Max asks (e.g. raise min-height).
