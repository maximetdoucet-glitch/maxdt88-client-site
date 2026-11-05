# maxdt88 HANDOFF (2026-11-05, cube v17)

## State
- Repo C:\Users\maxdo\maxdt88-client-site, branch rebuild-reelhaus. Uncommitted, NOT deployed (needs Max's go).
- Hero variant a (http://localhost:3088/?hero=a): glass pill "The tools I use", three.js Rubik cube, tool list right (md+), H1, CTA.
- src/components/site/hero-cube.tsx: 10 programs (ICONS with name); stickers on all 6 sides (interior blanks hidden); orient() + slerp keeps logos upright through turns; cube-focus event -> piece comes forward 4s, turns pause; exports glass + HeroToolList.
- src/components/sections/home-reel.tsx: imports HeroCube, HeroToolList, glass; cube + list in a relative wrapper.
- Backups: hero-cube.tsx / home-reel.tsx .bak-2026-11-05n (v16 state).
- QA (system Chrome, channel 'chrome'): NODE_PATH="D:/AntiGravity/omniroute/node_modules;C:/Users/maxdo/.claude/skills/building-websites/clone/scripts/node_modules"; node refs/hero-3d/qa-focus.cjs refs/hero-3d/shots; qa-v13.cjs x "$(pwd)/refs/hero-3d"; qa-apps.cjs.
- v17 checked: 0 console errors; clicking "Topaz Video" brings its piece forward (shots/v17-focus.jpg vs v17-turn.jpg).

## Next step
- Max reviews v17 live. Then pill/H1/CTA spacing via Master Brain (mb-task retrieve, values from Website Top-1% Standard / tokens, cite in DECISIONS).

## Open
- Extra tools for the list ("can use and do use"): Max to name them + official icon files.
- Mobile (<md) has no tool list; placement TBD.
- Tool list top item sits close under the nav at 1440x900.
- Remove window.__cubeApps QA hook before ship.
- Motion feel (turns, focus pop) UNVERIFIED until Max's trackpad.
- Older: Lionsgate card, "Independent edits" heading, remove variants B/C + debug pill, old webp/mp4 deletions.
