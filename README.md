# 💿 Flashback Charts Australia

> **Top 10 songs in Australia, every year from 1940 to present.**

Browse Australia's music charts by decade and year. Each decade has its own theme, and every chart entry links to playback on YouTube.

---

## Features

- **Year-by-year charts**: 1940 to present year
- **Decade themes**: unique visual identity for each decade
- **In-app playback**: stream any song via YouTube, with a persistent mini player
- **Search**: find songs and artists across all years instantly
- **SEO-ready**: prerendered routes, sitemap, and structured data

---

## Stack

- **Vue 3** + **TypeScript** + **Tailwind CSS v4**
- **Vite SSG** for static site generation with prerendered routes
- **Pinia** for state management
- **Plausible** for privacy-first analytics
- **Buttondown** for email sign-up

## Data

Chart data lives in `src/data/years/`, with one file per year. Each file exports a ranked list of songs with title, artist, and YouTube ID.
