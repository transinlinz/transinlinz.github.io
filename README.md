# Trans SHG Linz — Homepage

This is the website for the **Trans SHG Linz**, a community space for trans and inter people in Linz. The site provides information about our group, events, support resources, and relevant news.

**Visit the site:** [transinlinz.info](https://transinlinz.info)

## For Visitors

This website contains information about:

- **Who we are** — The Trans Self-Help Group Linz and our mission
- **Events & Meetups** — Community gatherings and support sessions
- **Counseling & Resources** — Support services and referrals
- **Legal & Transition Info** — Information about legal processes and transition pathways
- **Community Links** — Connections to other LGBTQI+ organizations in Linz

## For Developers

### Quick Start

**Prerequisites:** Node.js 24+ and pnpm

```bash
# Install dependencies
pnpm install

# Start development server (with live reload)
pnpm dev

# Build for production
pnpm build

# Format code
pnpm format
```

The site builds to `_site/` and is ready to deploy.

### Tech Stack

- **Eleventy 3.x** — Static site generator
- **Nunjucks** — Templating language
- **SCSS & Tailwind CSS v4** — Styling
- **PostCSS + Autoprefixer** — CSS processing

### Project Structure

```
src/
  index.njk                    # Main page template
  _includes/
    layouts/base.njk           # Base HTML layout
    templates/                 # Page sections (hash-based routing)
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
    main.scss                  # Main stylesheet
    _variables.scss
    _base.scss
    _nav.scss
    _layout.scss
    _content.scss
  js/
    main.js                    # Hash-based routing & menu
    plugins.js
```

### Architecture Notes

The site uses **hash-based routing** — page sections are `<template>` elements that are swapped in/out via `src/js/main.js` on `window.location.hash` change.

### Guidelines

- Run `pnpm run prettier` after editing `.md`, `.yml`, `.json`, `.js`, `.mjs`, `.sass`, `.html`, or `.njk` files
- Styles belong in SCSS partials (`src/css/`), not as utility classes in HTML
- New page sections go in `src/_includes/templates/`

See [AGENTS.md](AGENTS.md) for more detailed development guidelines.

## Contact

For questions or to get involved, visit [transinlinz.info](https://transinlinz.info).
