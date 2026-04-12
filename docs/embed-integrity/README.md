# Embed Integrity Reports

Use this directory to record per-decade playback integrity status while parallel agents work in separate worktrees.

## File Layout

Create one Markdown report per decade:

- `docs/embed-integrity/1940s.md`
- `docs/embed-integrity/1950s.md`
- `docs/embed-integrity/1960s.md`
- `docs/embed-integrity/1970s.md`
- `docs/embed-integrity/1980s.md`
- `docs/embed-integrity/1990s.md`
- `docs/embed-integrity/2000s.md`
- `docs/embed-integrity/2010s.md`
- `docs/embed-integrity/2020s.md`

## Required Sections

Each report should include:

- YAML frontmatter with:
  - `decade`
  - `agent`
  - `worktree`
  - `command`
  - `timeout_ms`
  - `status`
  - `last_run_at`
- `# <DECADE> Embed Integrity`
- `## Year Summary`
- `## Year Details`
- `## Outstanding Work`
- `## Fix Log`
- `## Handoff`

## Recommended Format

Use a single table in `Year Summary` with one row per year and these columns:

- `Year`
- `Songs`
- `Passed`
- `Failed`
- `Outstanding`
- `Status`

For each year in `Year Details`:

- record the year result
- list outstanding items in a small table if anything remains open
- note exact `youtubeVideoId` replacements when fixes are made
- say explicitly when the year is clean

## Status Values

Use these values consistently:

- `clean`
- `partial`
- `unverified`
- `blocked`
- `fixed`

## Handoff Rules

- Keep the report truthful to the last completed run.
- If a run stops mid-year, mark that year as partial or interrupted.
- If a failure is fixed, record the old and new video IDs.
- If the harness itself changes, mention that in `Fix Log`.

## Terminal Prompt

Paste this into each decade agent terminal:

```text
You own the <DECADE> decade. Run embed integrity for every year in your decade, fix as many issues as you can, and keep a detailed report in docs/embed-integrity/<DECADE>s.md.

Use this format exactly:
- YAML frontmatter with decade, agent, worktree, command, timeout_ms, status, last_run_at
- Year Summary table with one row per year
- Year Details section with one subsection per year
- Outstanding Work section with one bullet per unresolved item
- Fix Log section with exact file changes
- Handoff section with what is verified vs still open

For each year:
- run pnpm playback-integrity --year=YYYY
- record total songs, passed, failed, and outstanding items
- if a song fails, include year, rank, title, artist, current youtubeVideoId, failure reason, and next action
- if you fix a song, record the exact old/new ID and the file changed
- if a year is clean, still write a year subsection that says so

Keep the report updated as you work. Do not edit shared registry files unless that is explicitly part of your task. Prefer fixing year data and updating the report. When you finish, leave the report in a state that tells the integrator exactly what is done and what is still outstanding.

Start now with the first failing year in <DECADE>.
```
