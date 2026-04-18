# Trans SHG Linz — Homepage

This is the website for the **Trans SHG Linz**, a community space for trans and inter people in
Linz. The site provides information about our group, events, support resources, and relevant news.

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

- **Eleventy 3.x** + **eleventy-navigation** — Static site generator with multi-page navigation
- **Nunjucks** — Templating language
- **SCSS & Tailwind CSS v4** — Custom styles with Tailwind Preflight/normalization only (no utility
  classes)
- **PostCSS + Autoprefixer** — CSS processing

### Project Structure

```
src/
  index.njk                    # Home page
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
    layouts/base.njk           # Base HTML layout (nav, header, footer)
  css/
    main.scss                  # Imports all partials
    _variables.scss            # Design tokens
    _base.scss
    _nav.scss
    _layout.scss
    _content.scss
    _print.scss
  js/
    main.js                    # Email obfuscation, hamburger menu, legacy redirect
    plugins.js
```

### Architecture Notes

The site is a **multi-page static site** using the `@11ty/eleventy-navigation` plugin. Each section
is a standalone `.njk` file in `src/` with `eleventyNavigation` frontmatter (`key`, `title`,
`order`). The nav is rendered automatically from the collection in `base.njk`.

Legacy hash-based URLs (e.g. `/#shg`) are redirected client-side to the correct page via
`redirectLegacyHash()` in `main.js`.

### Guidelines

- Run `pnpm run prettier {file}` after editing `.md`, `.yml`, `.json`, `.js`, `.mjs`, `.sass`,
  `.html`, or `.njk` files
- Styles belong in SCSS partials (`src/css/`), not as utility classes in HTML
- New page sections: add a `.njk` file in `src/` with `eleventyNavigation` frontmatter

See [AGENTS.md](AGENTS.md) for more detailed development guidelines.
