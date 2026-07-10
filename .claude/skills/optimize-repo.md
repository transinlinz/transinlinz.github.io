---
name: optimize-repo
description: 'Audit and clean up CLAUDE.md and .claude/ files: cut redundancy, remove stale instructions,
  keep the single source of truth.'
argument-hint: 'Scope to optimize; report-only or apply fixes'
user-invocable: true
---

# Optimize Repo

Audit and cleanup playbook for this repo's Claude Code customization files. Use report-only mode to
survey, apply-fixes mode to repair.

## When to Use

- CLAUDE.md or `.claude/` files have grown verbose, redundant, or stale.
- After adding/removing skills — verify descriptions and pointers still correct.
- After project structure changes — verify CLAUDE.md still matches reality.

## This Project's Structure

Single-developer Eleventy static site. The only AI-tool customization surfaces are:

| Surface                        | Role                                                |
| ------------------------------ | --------------------------------------------------- |
| `CLAUDE.md`                    | Single source of truth for Claude Code in this repo |
| `.claude/settings.json`        | Permissions and hook config                         |
| `.claude/skills/*.md`          | Reusable skill procedures                           |
| `.claude/agents/*.md`          | Custom agent definitions (if any)                   |
| `.claude/scheduled_tasks.json` | Durable cron jobs (if any)                          |

No Copilot surfaces, no `.agents/` shared directory — Claude Code only.

## Procedure

1. **Mode:** report-only (survey, list issues) or apply-fixes (smallest edits that fix).
2. **Capture state:** `git status --short`, count relevant lines with
   `wc -l CLAUDE.md .claude/skills/*.md .claude/agents/*.md`.
3. **Audit against these rules:**
   - `CLAUDE.md` is the single source of truth. Skills must not restate rules already there.
   - Skill files contain only: frontmatter, procedure, validation, output format — not project
     policy.
   - Agent files contain only: role, routing, repo-specific behavior.
   - No file documents things that don't exist in this repo.
   - No file references tooling from other projects (e.g. `uv`, Python scripts, `.agents/`).
4. **Fix in this order:**
   - Delete stale references to files/directories/tools that don't exist.
   - Move policy that drifted into a skill back to CLAUDE.md.
   - Replace restated CLAUDE.md rules in skills with a pointer: `Follow CLAUDE.md.`
   - Cut padded explanation when a command or bullet carries the meaning.
5. **Re-check:** skill descriptions match what the skill does. No stale file paths. No references to
   foreign-project tooling.

## Writing Rules

- Match CLAUDE.md's direct, compressed tone. Bullets over paragraphs.
- German for page content, English for tooling instructions.
- No nesting deeper than one level unless the existing file already requires it.
- No decorative symbols. Preserve non-ASCII only where it carries meaning.

## Validation

1. `pnpm run prettier` on every changed Markdown file.
2. `git diff --check`.
3. Re-read changed files for padding, repeated phrases, stale references.
4. Confirm CLAUDE.md is the single source of truth — skills/agents point to it, not around it.
5. Confirm no references to foreign-project tooling (`uv`, `.agents/`,
   `.github/copilot-instructions.md`).

## Output

- Files optimized (list with change summary).
- Files audited, unchanged.
- Validation performed.
- Remaining issues left intentionally, with reason.
