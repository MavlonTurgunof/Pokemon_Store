import { Routes } from '@angular/router';
import { PokemonList } from './features/pokemon-list/pokemon-list';
import { PokemonDetail } from './features/pokemon-detail/pokemon-detail';

export const routes: Routes = [
  {
    path: 'pokemon',
    component: PokemonList,
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetail,
  },
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
];
