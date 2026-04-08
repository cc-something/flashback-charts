# Flashback Charts Australia

> **Top 10 songs in Australia, every year from 1940 to present.**

Browse Australia's music history — decade by decade, year by year. Each era comes to life with its own visual theme, and every chart entry is playable via YouTube.

---

## Features

- **Year-by-year charts** — 1940 through present, fully browsable
- **Decade themes** — unique visual identity for each decade
- **In-app playback** — stream any song via YouTube, with a persistent mini player
- **Keyboard navigation** — hotkeys to move between years, search, and control playback
- **Search** — find songs and artists across all years instantly
- **Newsletter** — subscribe for updates
- **SEO-ready** — prerendered routes, sitemap, and structured data

---

## Stack

- **Vue 3** + **TypeScript** + **Tailwind CSS v4**
- **Vite SSG** — static site generation with prerendered routes
- **Pinia** — state management
- **Plausible** — privacy-first analytics

---

## Development

```sh
pnpm install
pnpm dev        # start dev server
pnpm check      # lint + test
pnpm build      # type-check + SSG build + sitemap
pnpm format     # apply Prettier formatting
```

---

## Data

Chart data lives in `src/data/years/` — one file per year. Each file exports a ranked list of songs with title, artist, and YouTube ID.
