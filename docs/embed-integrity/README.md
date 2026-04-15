# Embed Integrity Reports

Use this directory to preserve the playback-integrity investigation history for each decade.

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
- `## Playback Test Rig Changes`
- `## Handoff`

## Recommended Format

Use a single table in `Year Summary` with one row per year and these columns:

- `Year`
- `Songs`
- `Passed`
- `Failed`
- `Verification`
- `Outstanding`
- `Status`

For each year in `Year Details`:

- record the year result
- include a `Verification:` line using one of:
  - `full decade run`
  - `full year run`
  - `targeted year run`
  - `helper scan only`
  - `partial run`
- list outstanding items in a small table if anything remains open
- when replacements exist, add a compact table with `Rank`, `Original`, and `Current`
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
- If a year was only checked via targeted probes or helper scans, say that explicitly in `Notes`.
- If a failure is fixed, preserve the replaced ideal `youtubeVideoId` as `Original` and the historical sourced `youtubeVideoId` as `Current`.
- If the playback test rig itself changes, mention that in `Playback Test Rig Changes`.

## Replacement History Format

- `Year Details` is the canonical machine-read source for replacement history.
- Record replacement tables under `- Changes made:`.
- Use one row per replacement with these columns: `Rank`, `Original`, `Current`.
- `Original` means the preferred video that was replaced during the embed-integrity work.
- `Current` means the alternative video that was sourced during that work, even if the live year file has since been restored to `Original`.
- Keep all rationale notes explaining why alternatives were sourced; this directory is the historical archive.

## Terminal Prompt

Paste this into each decade agent terminal:

```text
You own the <DECADE> decade. Run embed integrity for every year in your decade, fix as many issues as you can, and keep a detailed report in docs/embed-integrity/<DECADE>s.md.

Use this format exactly:
- YAML frontmatter with decade, agent, worktree, command, timeout_ms, status, last_run_at
- Year Summary table with one row per year
- Year Details section with one subsection per year
- Outstanding Work section with one bullet per unresolved item
- Playback Test Rig Changes section with test-runner or probe-script changes only
- Handoff section with what is verified vs still open

For each year:
- run pnpm playback-integrity --year=YYYY
- record total songs, passed, failed, and outstanding items
- if a song fails, include year, rank, title, artist, current youtubeVideoId, failure reason, and next action
- if you fix a song, update that year’s Changes made table with exact Original and Current IDs
- if a year is clean, still write a year subsection that says so
- use the strongest verification label that matches the evidence obtained for that year

Keep the report updated as you work. Do not treat these docs as live app status. Prefer fixing year data and updating the report. When you finish, leave the report in a state that tells the integrator exactly what is done and what is still outstanding.

Start now with the first failing year in <DECADE>.
```

## Live App Status

- The app now uses `best-match` and `alternative` as its only embed-integrity states.
- The current catalog and `src/data/embedIntegrityRegistry.ts` are intentionally flattened to `best-match`.
- `scripts/sync-embed-quality.ts` regenerates that flat registry from the current year files only.
- These decade reports remain for historical audit context and possible future restoration of the archived alternatives.
