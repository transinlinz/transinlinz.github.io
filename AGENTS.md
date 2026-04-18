# Trans\* SHG Linz — Agent Guidelines

## Formatting

If changed file match pattern `*.md`, `*.yml`, `*.json`, `*.js`, `*.mjs`, `*.sass`, `*.html`,
`*.njk` run:

```
pnpm run prettier {file-name-or-glob}
```

## Build & Dev

```
pnpm dev       # start dev server with live reload
pnpm build     # production build → _site/
pnpm format    # format all project files at once
```

## Tech Stack

- **Eleventy 3.x** — static site generator; input: `src/`, output: `_site/`
- **Nunjucks (.njk)** — templating language
- **SCSS** — custom styles in partials under `src/css/`
- **Tailwind CSS v4** — base/reset layer only (Preflight + normalization); no utility classes in
  HTML
- **PostCSS + Autoprefixer** — runs after SCSS compilation
- **Build pipeline:** SCSS → sass → prepend `@import "tailwindcss"` → PostCSS → CSS (see
  `eleventy.config.mjs`)

## Architecture

Multi-page static site using `@11ty/eleventy-navigation`. Each page standalone `.njk` in `src/` with
`eleventyNavigation` frontmatter (`key`, `title`, `order`). Nav rendered automatically in `base.njk`
from collection.

Legacy hash-based URLs redirected client-side via `redirectLegacyHash()` in `src/js/main.js`.

```
src/
  index.njk                   # home page
  shg.njk
  code-of-conduct.njk
  demands.njk
  meetup.njk
  counseling.njk
  queer-in-linz.njk
  transition.njk
  wiki.njk
  legal.njk
  _includes/
    layouts/base.njk          # base HTML layout (skip-link, nav, header, footer)
  css/
    main.scss                 # imports partials only
    _variables.scss           # design tokens
    _base.scss
    _nav.scss
    _layout.scss
    _content.scss
    _print.scss
  js/
    main.js                   # email obfuscation, hamburger menu, legacy hash redirect
    plugins.js
```

## Conventions

- **Do not alter page content.** Text in `.njk` files in `src/` must not change.
- **Styles go in SCSS partials**, not Tailwind utility classes in HTML.
- **SCSS partials** prefixed with `_`, imported via `src/css/main.scss`.
- **New page sections** → add `.njk` directly in `src/` with `eleventyNavigation` frontmatter.

## Agent Rules

- **Never write or execute custom Python scripts.** Use available CLI tools (pnpm scripts, git, sed,
  etc.) — sufficient for all tasks; easier to review.
- **Never rely on training data or cached knowledge for dependency/action versions.** Always fetch
  current release page from project website or GitHub repo to confirm latest version before
  specifying in any config file.
- **Write terse (caveman-speak).** New content in this file: compressed prose, drop articles/filler,
  fragments OK, short synonyms. Keep tokens low.
- **Check available tools at startup** (before reading/editing files). Probe for these commands and
  use freely if found: `jq` `fzf` `rg` `fd` `bat`/`batcat` `eza` `sd` `tokei` `hyperfine` `dust`
  `duf` `procs` `xh` `watchexec` `delta` `difftastic` `ag`
