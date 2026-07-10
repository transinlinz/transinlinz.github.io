# Trans SHG Linz — Claude project config

## Content rules

- **German-language site.** All page content (`.njk`, `.md`) is German. UI strings, alt text, aria
  labels also German.
- **Never alter page content** in `src/*.njk` or `src/*.md` unless explicitly asked. Style/behavior
  changes only touch CSS/JS/layout.

## Build & dev

```
pnpm dev       # eleventy --serve, live reload
pnpm build     # production build → _site/
pnpm format    # prettier all project files
```

## Formatting

After editing `*.md`, `*.yml`, `*.json`, `*.js`, `*.mjs`, `*.sass`, `*.html`, `*.njk`:

```
pnpm run prettier {file-or-glob}
```

## Tech stack

- **Eleventy 3.x** — static site generator; input: `src/`, output: `_site/`
- **Nunjucks (.njk)** — templating language
- **SCSS** — custom styles in partials under `src/css/`
- **Tailwind CSS v4** — base/reset layer only (Preflight + normalization); no utility classes in
  HTML
- **PostCSS + Autoprefixer** — runs after SCSS compilation
- **Build pipeline:** SCSS → sass → prepend `@import "tailwindcss"` → PostCSS → CSS (see
  `eleventy.config.mjs`)
- **pnpm** — package manager (Node 26+, pnpm 11.11.0)

## Style architecture

- Styles live in SCSS partials (`src/css/_*.scss`), imported via `src/css/main.scss`.
- Tailwind v4 is used for **Preflight/reset only**. No utility classes in HTML. New styles → SCSS
  partial, not a Tailwind class in markup.
- Design tokens in `src/css/_variables.scss` — palette (`#55cefa` blue, `#f6abb6` pink), breakpoints
  (mobile-first: 640/768/1024/1280/1536), max content widths (720px/900px).
- Typography: Montserrat (self-hosted via `@fontsource-variable/montserrat`), 16px base scaling to
  18px at ≥768px.

## Architecture

Multi-page static site using `@11ty/eleventy-navigation`. Each page is a standalone `.njk` or `.md`
in `src/` with `eleventyNavigation` frontmatter (`key`, `title`, `order`). Nav rendered
automatically in `base.njk` from the collection.

Legacy hash-based URLs (e.g. `/#shg`) redirected client-side via `redirectLegacyHash()` in
`src/js/main.js`.

```
src/
  index.md                    # home page — meeting times, group info
  shg.md                      # about the self-help group
  code-of-conduct.md          # group rules (German: Gruppenregeln)
  demands.md                  # political demands
  meetup.md                   # meetup info
  counseling.md               # counseling resources
  queer-in-linz.md            # LGBTQI+ orgs in Linz
  transition.md               # transition info
  wiki.md                     # wiki/resources
  legal.md                    # legal info
  404.md                      # custom 404 page
  _includes/
    layouts/base.njk          # base HTML layout (skip-link, nav, header, footer)
  css/
    main.scss                 # imports partials only
    _variables.scss           # design tokens
    _base.scss                # base element styles, links, focus
    _nav.scss                 # navigation bar, hamburger menu
    _layout.scss              # page layout, hero, content cards
    _content.scss             # typography, lists, images, footnotes
    _print.scss               # print stylesheet
    _fonts.scss               # @fontsource montserrat import
  js/
    main.js                   # email obfuscation, hamburger menu, legacy hash redirect, inclusive language toggle
    plugins.js                 # third-party plugin init
    vendor/
      modernizr-3.11.2.min.js
  img/                        # responsive images (AVIF + JPG fallback), logo, favicon
  sw.js                       # service worker
  site.webmanifest
  robots.txt
  humans.txt
  CNAME                       # transinlinz.info
```

## Conventions

- **No custom Python scripts.** Use CLI tools (pnpm, git, sed, etc.) — sufficient for all tasks.
- **No training-data reliance for versions.** Fetch current release page to confirm latest version
  before specifying in any config.
- **Check available tools at startup** (before reading/editing). Use freely if found: `jq` `fzf`
  `rg` `fd` `bat`/`batcat` `eza` `sd` `tokei` `hyperfine` `dust` `duf` `procs` `xh` `watchexec`
  `delta` `difftastic` `ag`.
- **Write terse.** Compressed prose, drop articles/filler, fragments OK, short synonyms. Keep tokens
  low.

## Deploy

- GitHub Pages with custom domain `transinlinz.info` (CNAME in `src/CNAME`).
- `_site/` is the deploy root. Build output only — never edit by hand.
- Service worker (`src/sw.js`) caches: images (30d cache-first), fonts (1yr cache-first), CSS/JS
  (stale-while-revalidate). Bump `CACHE_VERSION` on deploy to invalidate all caches.

## Frontend JS

- `src/js/main.js`: email obfuscation (character-code reconstruction), hamburger menu toggle, legacy
  hash-based URL redirect, inclusive language toggle (persists to `localStorage`).
- `src/js/plugins.js` and `src/js/vendor/modernizr-3.11.2.min.js` loaded before main.

## Accessibility

- Skip link, focus-visible outlines, hamburger with `aria-expanded`/`aria-controls`.
- Inclusive language toggle: hides gender asterisks when checked (stored in localStorage via
  `--inclusive-language-display` / `--generic-masculine-prefix-display` CSS custom properties).
- `prefers-reduced-motion` respected (see `_layout.scss`).

## Git

- Conventional Commits. Subject ≤50 chars German or English — match surrounding commit style.
- Branch `main` is the default and deploy branch.
- No force-push, no `--no-verify`, no amending pushed commits.

## In-page anchors

- Anchor targets use `id="kebab-case"` on the target element (no `<a name="...">`, no `{#...}`).
  - Examples: `<li id="bily">`, `<small id="fn-1">`.
- Links use plain fragment hrefs: `<a href="#bily">`, `<a href="/counseling/#bily">` for cross-page.
- **Footnotes** follow a bidirectional pattern:
  - Reference (inline): `<a href="#fn-N" id="fnref-N"><sup>N</sup></a>`
  - Definition (page bottom): `<small id="fn-N"><a href="#fnref-N"><sup>N</sup></a> …</small>`
  - N is the footnote number.
