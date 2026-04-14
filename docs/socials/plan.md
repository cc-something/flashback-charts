# Flashback Charts Social + Spotify Strategy

## Goal

Drive consistent, compounding awareness for `flashbackcharts.com` by turning the site archive into a repeatable content engine across Facebook, X.com, and Spotify.

The site covers Australian charts from `1940` to `2025`, so the strategy should segment by memory window rather than talk to every age group in the same voice.

## Consumer Research

| Channel  | Research signal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Best-fit audience                                                  | Role in mix                                    |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| Facebook | ACMA reported Facebook remained the most-used platform among Australian adults in 2025 at `78%`, well ahead of X.com at `14%`. Source: <https://www.acma.gov.au/publications/2026-02/report/communications-and-media-australia-how-we-communicate>                                                                                                                                                                                                                                             | `35-64` primary, `65+` secondary                                   | Primary traffic and comment volume             |
| X.com    | ACMA reported X.com declined year over year in Australia. Pew's 2025 U.S. fact sheet also shows X.com is much smaller than Facebook and stronger among `18-49` than `65+`. Sources: <https://www.acma.gov.au/publications/2026-02/report/communications-and-media-australia-how-we-communicate>, <https://www.pewresearch.org/internet/fact-sheet/social-media/>                                                                                                                               | `25-44` primary, `45-54` secondary                                 | Fast opinions, chart debates, brand repetition |
| Spotify  | Spotify positions itself as strong with Gen Z and millennials, while Edison Research's 2024 Music Discovery Report confirms Spotify is a major music-discovery surface. Public playlists also appear on public profiles and discovery surfaces. Sources: <https://ads.spotify.com/en-AU/spotify-ads-audience/>, <https://www.edisonresearch.com/wp-content/uploads/2024/08/Press-Release-Music-Discovery-Report.pdf>, <https://support.spotify.com/ao-en/article/playlist-privacy-and-access/> | `18-44` primary, nostalgia-curious listeners of all ages secondary | Searchable discovery and branded recall        |

## Target Segments

### Segment 1: Core nostalgia traffic

- Age: `35-64`
- Channels: Facebook first, X.com second
- Memory window: `1970s` to `2000s`
- Best hooks: "Do you remember...", "What was the real song of the year?", "This chart still feels unbeatable"

### Segment 2: Legacy nostalgia

- Age: `65+`
- Channels: Facebook
- Memory window: `1950s` to `1970s`
- Best hooks: chart memories, Beatles-era posts, singalong classics, early TV/radio nostalgia

### Segment 3: Discovery and debate

- Age: `25-44`
- Channels: X.com and Spotify
- Memory window: `1990s` to `2020s`
- Best hooks: chart battles, "deserved #1?", pop-culture contrast posts, searchable playlist titles

## Channel Roles

### Facebook

- Job: pull broad adult audiences into year and decade pages
- Strength: memory prompts, comments, shares, multi-generational reach
- Weakness: needs warm, conversational copy rather than short headline copy
- Copy rule: aim for `180` to `250` characters before the link, put the nostalgia trigger in sentence one, and end on one clear question or action

### X.com

- Job: keep the brand visible through opinion-led music prompts
- Strength: compact hooks, reactive tone, easy debate format
- Weakness: lower reach ceiling than Facebook, so every post needs a sharper angle
- Copy rule: aim for `90` to `140` characters before the link, lead with the argument, and avoid setup that delays the opinion prompt

### Spotify

- Job: create searchable brand touchpoints through public playlists
- Strength: aligns with music intent, playlist search, saves, and repeat listening
- Weakness: direct click-through is weaker than social, so success depends on title clarity, brand repetition, and profile consistency

## Content Pillars

1. `Year Spotlights`
   - Best landing page: `/au/{year}/`
   - Best for: broad traffic and nostalgia
2. `Artist Hooks`
   - Best landing page: year or decade page containing the artist
   - Best for: comments and shares
3. `Decade Summaries`
   - Best landing page: `/au/{decade}/`
   - Best for: broad generational targeting
4. `Chart Battles`
   - Best landing page: year page
   - Best for: X.com replies and Facebook comments
5. `#1 Flashbacks`
   - Best landing page: year page
   - Best for: easy recognition and repeatable format
6. `Forgotten Hits`
   - Best landing page: older year pages and decade pages
   - Best for: curiosity clicks

## Cadence

### Weekly Posting Rhythm

| Day       | Theme                           | Primary landing page |
| --------- | ------------------------------- | -------------------- |
| Monday    | Year Spotlight                  | Year page            |
| Tuesday   | Artist Hook                     | Year or decade page  |
| Wednesday | Decade Summary                  | Decade page          |
| Thursday  | Chart Battle                    | Year page            |
| Friday    | #1 Flashback                    | Year page            |
| Saturday  | Forgotten Hit                   | Year or decade page  |
| Sunday    | Best of the Week / archive push | Decade page or home  |

### Channel Timing

- Facebook: post daily at `7:30 PM Australia/Melbourne`
- Facebook community window: reply to comments within `45` minutes of publishing
- X.com: post daily at `12:30 PM Australia/Melbourne`
- X.com community window: reply or quote-reply within `30` minutes of publishing
- Spotify: refresh playlists every Tuesday at `11:00 AM Australia/Melbourne`
- Spotify featured playlist rotation: first Monday of each month

## KPIs

| Channel  | Primary KPI                       | Secondary KPI                        | Practical target                                            |
| -------- | --------------------------------- | ------------------------------------ | ----------------------------------------------------------- |
| Facebook | Sessions to year and decade pages | Comments, shares, playback starts    | Build repeatable traffic from nostalgia prompts             |
| X.com    | Link clicks and profile visits    | Replies, reposts, bookmarks          | Keep the brand in music-chart conversations                 |
| Spotify  | Playlist followers and saves      | Profile follows, branded search lift | Make `Flashback Charts` discoverable in music-search intent |

## UTM Convention

Use the same structure across Facebook and X.com:

- `utm_source=facebook` or `utm_source=xcom`
- `utm_medium=social`
- `utm_campaign=social_calendar_week{n}`
- `utm_content=day{nn}_{theme}`

Example:

`https://flashbackcharts.com/au/1984/?utm_source=facebook&utm_medium=social&utm_campaign=social_calendar_week1&utm_content=day01_year_spotlight`

Spotify should not rely on UTMs inside playlist descriptions. Use brand mention plus plain-text domain mention instead:

- `Flashback Charts Australia`
- `flashbackcharts.com`

## Asset Rules

Use existing site assets first:

- `public/og/au/home.jpg`
- `public/og/au/decade-1940s.jpg` through `public/og/au/decade-2020s.jpg`
- `public/og/au/year-1940.jpg` through `public/og/au/year-2025.jpg`
- `public/social/au/facebook-cover.jpg`
- `public/social/au/twitter-header.jpg`
- `public/social/au/universal-banner.jpg`

Creative direction:

- Facebook images should look warm, legible, and memory-led
- X.com images should be punchier and easier to parse at speed
- Spotify covers should be square, bold, and readable at thumbnail size
- Avoid cluttered collage treatments unless the post is a decade roundup

## Pre-Launch Optimisations

- Keep most Facebook posts to one short paragraph. If a post needs a second sentence, make it the prompt.
- Keep most X.com posts to one thought, one contrast, or one question.
- Avoid repeating the same CTA verb more than `2` days in a row.
- Prioritise comment bait on Facebook and opinion bait on X.com.
- Use decade pages for broad prompts and year pages for specific artist or `#1` hooks.
- If a post underperforms, test a stronger first `5` words before changing the visual.

## Measurement Notes

- Traffic should flow mostly to `/au/`, `/au/{decade}/`, and `/au/{year}/`
- Playback starts matter because the site already nudges engaged listeners into deeper sessions
- Spotify success should be evaluated as assisted discovery, not strict last-click conversion

## Platform Docs

- Facebook calendar: [`docs/socials/facebook/README.md`](./facebook/README.md)
- X.com calendar: [`docs/socials/x-com/README.md`](./x-com/README.md)
- Spotify discovery plan: [`docs/socials/spotify/README.md`](./spotify/README.md)
