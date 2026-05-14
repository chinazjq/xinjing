# AGENTS.md — 心镜 (Nine Mirrors)

WeChat Mini Program — 9-in-1 personality test platform. Monetized via WeChat IAA (rewarded video ads).

## Project Layout

```
code/          ← Mini program root (open THIS in WeChat DevTools)
  pages/         8 pages: home, explore, profile, intro, quiz, ad, result, share
  data/          Test metadata + question banks + result definitions
  utils/         scoring.js, storage.js, format.js
  cloudfunctions/  saveResult, getResults (Node.js, wx-server-sdk)
  app.js/json/wxss  Global entry + design system CSS variables
UI/            Static HTML design deck (prototype / visual reference)
doc/           PRD (prd_extracted.txt) + question bank spec (markdown)
```

**DevTools entry point**: `code/` directory, NOT the repo root.

## Tech Stack

- **WeChat native Mini Program** (WXML / WXSS / JS). No frameworks, no npm in the mini program.
- **WeChat Cloud Development (CloudBase)**: database, cloud functions, cloud storage.
- **Cloud DB collection**: `results` (stores per-user test records, keyed by `_openid`).
- **AppID**: `wx549effc1445cb6b3`. Cloud env name: `"test"`.
- Base library version: `2.33.0`. Tab indent: 2 spaces.

## How to Run

Open `code/` in **WeChat DevTools** (微信开发者工具). No `npm install` or build step needed — cloud functions are deployed from DevTools.

Cloud functions must be uploaded via DevTools: right-click `cloudfunctions/saveResult` → "上传并部署".

## Data Architecture

| Path | Purpose |
|------|---------|
| `data/tests.js` | Test registry array. Each entry: `{ id, name, nameZh, theme, count, ... }`. `getTestById(id)` lookup. |
| `data/questions/{id}.js` | Question bank per test. Exported as flat array. |
| `data/results/{id}.js` | Result definitions per test (type descriptions, strengths, etc.). |

**Adding a new test**: add entry to `data/tests.js`, create question file in `data/questions/`, result file in `data/results/`, add scoring logic in `utils/scoring.js`, add page route in `app.json`, wire up in `pages/quiz/quiz.js` `loadQuestions()` switch and `MODE_MAP`.

## Question Modes

Three answer formats, set via `MODE_MAP` in `quiz.js`:

- **binary** — A/B choice: mbti, enneagram, holland
- **multi** — multi-option (2–4 choices): sbti, color
- **likert** — 5-point scale: attach, ocean, eq, love

Question objects differ by mode. Binary: `{ d, q, a, b }`. Multi: `{ q, opts: [{ text, type/c }] }`. Likert: `{ q, dim, r }` (r = reverse-scored).

## Scoring

All scoring functions in `utils/scoring.js`:

- `scoreMBTI` — dimension sum (+1/-1), threshold ≥ 0
- `scoreSBTI` — tally by type key, highest wins
- `scoreColor` — tally by R/B/Y/G color key
- `scoreTwoWay` — enneagram/holland: A maps to `ta`, B to `tb`
- `scoreAttach` — Likert average per dimension, ≥ 3 = high
- `scoreLikertDim` / `scoreLikertTotal` — general Likert handlers

Reverse-scored items: `likertValue(raw, reverse)` returns `6 - raw`.

## Design System (Critical for UI Changes)

CSS custom properties defined in `app.wxss` on `page {}`:

- **Core**: `--ink` (#0E0E10), `--paper` (#F4EEE3) — dark/light swap in `page[data-theme="dark"]`
- **Accents** per test module: `--ember`, `--jade`, `--iris`, `--amber`, `--sky`, `--plum`, `--rose`, `--saffron`
- **Stone neutrals**: `--stone-900` through `--stone-100`
- **Borders**: `--hairline`, `--hairline-dim`

Each test has a `{ main, soft, bg, token }` theme object in `tests.js` — used to dynamically set page colors.

Font families: `"PingFang SC"` body, `"Songti SC"` display, `"SF Mono"` / monospace for labels. Sizes in `rpx`.

Dark mode: listen via `wx.onThemeChange`, swap `--ink`/`--paper` and desaturate accents.

## Cloud Functions

- **saveResult**: Writes to `results` collection. Payload: `{ record: { testId, testName, result, duration } }`.
- **getResults**: Reads last 100 results for current user (by `_openid`).

Both use `wx-server-sdk`. Deployed to cloud env `"test"`.

## Storage

- Local: `wx.setStorageSync('testHistory', [...])` — max 50 records, newest first.
- Cloud: `saveResult` cloud function — fire-and-forget, silent on failure.
- History record shape: `{ id, testId, testName, result, duration, createdAt }`.

## Common Gotchas

- The repo root is NOT the mini program root. Always work in `code/` for mini program code.
- Question data files use `module.exports`, not ES modules. Import via `require()`.
- `project.private.config.json` overrides `project.config.json` for local dev settings (hot reload on, URL check off).
- The `UI/` directory is a **static prototype only** — it has no build pipeline and is not shipped.
- The `doc/` PRD is the source of truth for feature specs. The question bank markdown is the authoritative question set.
- There is no test framework. Manual testing via DevTools simulator + real device preview.
