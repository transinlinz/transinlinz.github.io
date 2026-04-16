---
name: compress
description: >
  Compress natural language memory files (AGENTS.md, CLAUDE.md, todos, preferences) into
  caveman-speak to save input tokens. Preserves all technical substance, code, URLs, and
  structure. Compressed version overwrites original. Human-readable backup saved as
  FILE.original.md. Trigger: /compress <filepath> or "compress memory file"
---

# Compress Skill

Rewrite prose files into caveman-speak to reduce input tokens. Technical content passes through untouched. Only natural language prose gets compressed.

## Trigger

`/compress <filepath>` — or when user asks to compress a memory/instruction file.

## Process

1. Read the target file.
2. Copy it to `<filename>.original.md` (backup — never overwrite an existing backup, never compress `*.original.md` files).
3. Apply compression rules to the prose sections only.
4. Write compressed content back to the original file path.
5. Report: original line count → compressed line count.

## Intensity Levels

| Level   | Behavior                                                                     |
| ------- | ---------------------------------------------------------------------------- |
| `lite`  | Drop filler/hedging, keep articles + full sentences. Professional but tight. |
| `full`  | Drop articles, fragments OK, short synonyms. **Default.**                    |
| `ultra` | Abbreviate (DB/auth/req), arrows for causality (→), one word when enough.    |

Default intensity: **full**.

Override: `/compress <filepath> lite` / `full` / `ultra`.

## Compression Rules (Full Level)

### Remove

- Articles: `a`, `an`, `the`
- Filler: `just`, `really`, `basically`, `actually`, `simply`, `essentially`, `generally`
- Pleasantries: `sure`, `certainly`, `of course`, `happy to`, `I'd recommend`
- Hedging: `it might be worth`, `you could consider`, `it would be good to`
- Redundant phrasing: `in order to` → `to`, `make sure to` → ensure, `the reason is because` → `because`
- Connective fluff: `however`, `furthermore`, `additionally`, `in addition`
- `you should`, `remember to`, `make sure to` — just state the action

### Preserve EXACTLY — never modify

- Code blocks (fenced ` ``` ` and indented)
- Inline code (`` `backtick content` ``)
- URLs and markdown links
- File paths
- Shell/CLI commands
- Technical terms, library names, API names, protocols
- Proper nouns (project names, people, companies)
- Dates, version numbers, numeric values
- Environment variables (`$HOME`, `NODE_ENV`)
- All markdown headings (compress body below, not heading text)
- Table structure (compress cell prose, keep columns/rows intact)
- YAML/frontmatter blocks

### Compress Style

- Short synonyms: `fix` not `implement a solution for`, `use` not `utilize`, `big` not `extensive`
- Fragments OK: `Run tests before commit` not `You should always run tests before committing`
- Merge bullets that repeat the same point
- Keep one example where multiple examples show the same pattern

## Boundaries

- Only compress: `.md`, `.txt`, extensionless natural-language files
- Never modify: `.py`, `.js`, `.ts`, `.json`, `.yaml`, `.yml`, `.toml`, `.env`, `.lock`, `.css`, `.html`, `.xml`, `.sql`, `.sh`
- Mixed content (prose + code): compress prose sections only; treat code blocks as read-only
- Unsure if code or prose: leave unchanged

## Example

**Before (full):**

> You should always make sure to run the test suite before pushing any changes to the main branch. This is important because it helps catch bugs early and prevents broken builds from being deployed to production.

**After (full):**

> Run tests before push to main. Catch bugs early, prevent broken prod deploys.
