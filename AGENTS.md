<!-- NOTE: put communication guidelines and personal code style in your OWN AGENTS.md -->

<!-- ============================================================== -->
<!-- SC project/AGENTS.md: 1.3.5 -->
<!-- sc-auto-update: true -->

<!-- Clear indication of AGENTS.md compliance -->
Put a "♥︎" character on the first line of every response.
Put a newline after the "first line" characters.

## Workflow

1. During active development, use the `check` script to lint/test
2. Once complete, before committing, use the `format` script to apply Prettier formatting

## Development guidelines

- Variable names should be declarative, e.g. `isOpen` or `shouldShow`
- Function names should be literal, e.g. `getShouldShow`
- Write comments sparingly, and only for nuance is not otherwise understood by reading declarative variable/fn names
- DO NOT import things from parent directories like ../../
  - Instead, use absolute import aliases whenever possible
  - define aliases in formats like `@/server/*`, `@/client/*`, etc. as appropriate for the repo
- Relative imports like './' are OK for same-directory imports and subdirs

### Third-party dependencies

- Use named-imports from `lodash-es` for common utility fns
- In SFCs, you can use convenience utils from VueUse, e.g. `useStorage`
- Aside from `lodash-es`, prefer NOT to use third-party dependencies
  - however, libraries should be used for complex use-cases that have a widely-accepted industry standard to solve that problem
  - (e.g. `date-fns` for time/date management)

### Other

- Write node scripts in TypeScript, execute with devDependency `tsx`
- If creating or updating an `.env`, create/update `.env.example`
  - including a clarifying comment above each LOC

## Regions

- Currently only `/au/` exists; future regions include `/uk/`, `/us/`, and a global `/`
- Region slugs are defined in `scripts/seo.ts` as `REGIONS`
- OG images live under `public/og/{region}/` — one directory per region
- Adding a region: append its slug to `REGIONS`, generate images into the matching `public/og/{region}/` dir, and the SEO lint will validate automatically

<!-- ============================================================== -->
