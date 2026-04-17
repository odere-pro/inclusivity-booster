# inclusivity-booster

> AI-powered content adaptation demo — the same news article, reshaped for every reader.
> Adapted by age, language, gender identity, reading level, and format. No content rewrite required.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude API](https://img.shields.io/badge/Powered%20by-Claude%20AI-orange)](https://www.anthropic.com)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

**[Live demo →](https://odere-pro.github.io/inclusivity-booster/)**

---

## The problem

Publishers write for one imagined reader and call it universal.

The same housing policy story lands completely differently for a 12-year-old, a recent immigrant reading in their second language, a senior unfamiliar with bureaucratic jargon, or a professional who wants the data without the framing. Most content systems have no mechanism to bridge this gap — the article ships as-is and excludes by default.

## What it does

Inclusivity Booster takes real news articles and shows them adapted for diverse reader personas — side by side with the original.

- **Filter by five dimensions** — language, age group, reading level, gender identity, and format
- **Side-by-side comparison** — original article next to the adapted version
- **Visible reasoning** — each adaptation shows *what changed* and *why* (vocabulary, framing, tone, cultural references)
- **Pre-generated via Claude API** — adaptations ship with explicit inclusivity metadata so the reasoning is transparent

## Adaptation dimensions

| Dimension | Options |
|-----------|---------|
| Language | English, Ukrainian |
| Age group | Child · Teen · Young adult · Adult · Senior |
| Reading level | Simple · Standard · Expert |
| Gender identity | Woman · Man · Non-binary · Genderfluid |
| Format | Article · LinkedIn · Social media · Newsletter |

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`, pick a persona using the filter bar, and compare the adapted article to the original.

## How it works

1. **Persona selection** — the filter bar builds a persona from five independent dimensions
2. **Side-by-side view** — the ArticlePane renders the original alongside the adapted version
3. **Dimension breakdown** — the DimensionBreakdown section explains each editorial change
4. **Evidence strip** — sources and citations are preserved across all adaptations

Adaptation content is pre-generated using the Claude API with structured prompts that produce explicit inclusivity metadata alongside the rewritten text. The app is a viewer — the AI inference already happened; the data lives in the `src/data/` JSON files.

## Stack

- **[Svelte 5](https://svelte.dev)** + Vite — reactive UI with runes-based state
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling
- **[Anthropic Claude API](https://www.anthropic.com)** — powers content adaptation (pre-generated)
- **GitHub Pages** — zero-config deployment via GitHub Actions

## Use cases

| Who | How they use it |
|-----|----------------|
| Content strategists | Visualize how the same story lands across different demographics |
| Educators | Demonstrate inclusive writing principles with a live example |
| Journalists | Test whether a piece reaches beyond its default audience |
| Developers | Reference implementation for AI-powered content adaptation pipelines |

## Project structure

```
src/
├── components/      # Reusable UI: PersonaCard, EvidenceCard, StatBadge, …
├── sections/        # Layout sections: HeroQuote, FilterBar, ArticlePane, …
├── data/            # Pre-generated adaptations (JSON) + sources
└── lib/
    └── state.svelte.js   # Central reactive state (persona selection, filters)
```

## Related projects

- [accessibility-booster](https://github.com/odere-pro/accessibility-booster) — AI-powered accessibility layer for any webpage. Six toggles, WCAG AAA contrast, Claude Vision, plain language, captions. Zero redesign.

## License

[MIT](LICENSE)
