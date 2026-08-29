import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/pokemon-list/pokemon-list').then((m) => m.PokemonList),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./features/pokemon-detail/pokemon-detail').then((m) => m.PokemonDetail),
  },
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
];
