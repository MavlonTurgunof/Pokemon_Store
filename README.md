# Pokemon World

A Pokemon database app built with Angular 18-21 and Tailwind CSS. Powered by [PokeAPI](https://pokeapi.co/), it displays a list of Pokemon with infinite scroll and opens each Pokemon's detailed information on a separate page.

## Tech Stack

- **Angular 18-21** — standalone components, signal-based state
- **Tailwind CSS** — styling
- **RxJS** — managing HTTP streams (`switchMap`, `forkJoin`)
- **NgOptimizedImage** — image optimization (lazy loading, LCP)
- **PokeAPI** — data source

## Project Structure

\`\`\`
src/app/
├── core/
│ ├── models/
│ │ ├── pokemon.ts // interfaces: Pokemon, PokemonListItem, PokemonCardItem...
│ │ └── pokemon.mapper.ts // Pokemon -> PokemonCardItem transformation
│ └── services/
│ └── pokemon.service.ts // HTTP requests (list, detail)
│
├── store/
│ └── pokemon.store.ts // Signal-based global state
│
├── shared/
│ └── components/
│ ├── pokemon-card/ // Single Pokemon card in the list
│ └── scroll-trigger/ // IntersectionObserver for infinite scroll
│
├── features/
│ ├── pokemon-list/ // Home page — list of Pokemon
│ └── pokemon-detail/ // Single Pokemon's detail page
│
├── app.routes.ts
└── app.config.ts
\`\`\`

**Architecture principle:**

- `core` — things used once across the whole app (services, models, mappers)
- `shared` — reusable "dumb" components (only `input`/`output`, no internal logic)
- `features` — page-level "smart" components that talk to the store directly

## Key Features

### 1. Pokemon List

The list is fetched from the `/pokemon` endpoint. For each item, an additional detail request (`forkJoin`) is made to gather all the data needed to render the card (image, height, experience, order).

### 2. Infinite Scroll

Instead of numbered pagination, the next page is loaded automatically (via `IntersectionObserver`) when the user reaches the end of the list, and appended to the existing list.

### 3. Detail Page

Clicking a Pokemon card navigates to the `/pokemon/:id` route. Data is loaded directly from the **route parameter** (not dependent on the list state), so both:

- Direct access via URL
- Page refresh

correctly display the data.

### 4. Image Optimization

Lazy loading is applied via the `NgOptimizedImage` directive; a `preconnect` is added for images served from the external domain (`raw.githubusercontent.com`).

## Setup and Running

\`\`\`bash
npm install
ng serve
\`\`\`

The app runs at `http://localhost:4200`.

## Future Plans

- Migrate state management from the Signal store to NgRx (for learning/comparison)
- Optimize pagination for larger lists
