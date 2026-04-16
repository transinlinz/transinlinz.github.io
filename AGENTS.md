# Trans\* SHG Linz — Agent Guidelines

## Formatting

If changed file match pattern `*.md`, `*.yml`, `*.json`, `*.js`, `*.mjs`, `*.sass`, `*.html`, `*.njk` run:

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
- **Tailwind CSS v4** — base/reset layer only (Preflight + normalization); no utility classes in HTML
- **PostCSS + Autoprefixer** — runs after SCSS compilation
- **Build pipeline:** SCSS → sass → prepend `@import "tailwindcss"` → PostCSS → CSS (see `eleventy.config.mjs`)

## Architecture

SPA with hash-based routing. Page sections are `<template>` elements; `src/js/main.js` swaps content on `window.location.hash` change.

```
src/
  index.njk                   # page shell + {% include %} directives
  _includes/
    layouts/base.njk          # base HTML layout
    templates/                # one file per page section
      home.njk
      shg.njk
      code-of-conduct.njk
      demands.njk
      meetup.njk
      counseling.njk
      queer-in-linz.njk
      transition.njk
      wiki.njk
      legal.njk
  css/
    main.scss                 # imports partials only
    _variables.scss
    _base.scss
    _nav.scss
    _layout.scss
    _content.scss
    _print.scss
  js/
    main.js                   # hash routing + hamburger menu
    plugins.js
```

## Conventions

- **Do not alter page content.** Text inside `<template>` blocks in `src/_includes/templates/` must not be changed.
- **Styles go in SCSS partials**, not as Tailwind utility classes in HTML.
- **SCSS partials** are prefixed with `_` and imported via `src/css/main.scss`.
- **New page sections** → add a file in `src/_includes/templates/` and include it in `src/index.njk` via `{% include %}`.
