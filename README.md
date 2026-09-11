# Mamikos Homepage Clone

Submission for the **Frontend Engineer Technical Test: AI-Assisted Build**. A Mamikos homepage clone using local mock data, with no backend or database.

**Live demo:** [mamikos-clone.yuoibur.workers.dev](https://mamikos-clone.yuoibur.workers.dev)

## Approach & workflow

I started by inspecting website references and planning with AI, then split the work into small checkpoints: foundation, shell, mock data, components, and page sections. I used **Traycer with Codex (Luna Max)**, with one coordinator and three agents covering UI, mock data/state, and review/QA.

The initial scope included the homepage, search overlay, search results, profile, favorites, room details, and an auth modal. Midway through development, I narrowed it to **the homepage only** due to time and resource constraints. Implementations outside that scope were then removed.

I did not accept AI output without checking it: I compared the UI against the references and requested corrections section by section, including the navbar, footer, and navbar search visibility on scroll. I also simplified the workflow by handling visual checks myself while AI helped with implementation, fixes, and code/build checks.

## Stack & key decisions

- **Vite, React, TypeScript, Tailwind CSS, and shadcn/ui**, with Embla for carousels.
- Reusable components are grouped by context; the homepage is composed in `src/pages/HomePage.tsx`.
- Room listings use local mock data; assets are organized into groups such as brand, icons, promotions, areas, and campuses.
- The final scope focuses on the navbar, hero, promo carousel, room listings, popular areas/campuses, Mamikos information, and footer.
- Search, profile, favorites, and room details are not active pages. Their buttons are display-only and do not navigate; local interactions such as carousels and menus remain available.

## Run locally

```bash
npm install
npm run dev
```

Checks and production build:

```bash
npm run typecheck
npm run self-check
node src/components/AppShell.test.mjs
npm run build
```

This project was built for a technical test and is not an official Mamikos service. Visual branding and reference assets belong to their respective owners.
