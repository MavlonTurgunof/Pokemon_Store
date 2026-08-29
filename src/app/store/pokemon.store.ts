import { computed, inject, Injectable, signal } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { Pokemon, PokemonCardItem } from '../core/models/pokemon';
import { toCardItem } from '../core/models/pokemon.mapper';
import { PokemonService } from '../core/services/pokemon-service';

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private readonly pokemonService = inject(PokemonService);

  pokemonList = signal<PokemonCardItem[]>([]);
  selectedPokemon = signal<Pokemon | null>(null);
  currentPage = signal(1);
  totalPokemon = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  loadPokemon(page: number = 1) {
    this.loading.set(true);
    this.error.set(null);

    this.pokemonService
      .getPokemonList(page)
      .pipe(
        switchMap((res) => {
          this.totalPokemon.set(res.count);
          console.log(res);
          const detailRequests = res.results.map((item) =>
            this.pokemonService.getPokemon(this.pokemonService.extractIdFromUrl(item.url)),
          );
          return forkJoin(detailRequests);
        }),
      )
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          const newItems = pokemons.map(toCardItem);
          if (page === 1) {
            this.pokemonList.set(newItems);
          } else {
            this.pokemonList.update((current) => [...current, ...newItems]);
          }

          this.currentPage.set(page);
          this.loading.set(false);
          console.log(pokemons);
        },
        error: () => {
          this.error.set('Failed to load Pokemon');
          this.loading.set(false);
        },
      });
  }
  hasMore = computed(() => this.pokemonList().length < this.totalPokemon());
  loadPokemonById(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.pokemonService.getPokemon(id).subscribe({
      next: (pokemon) => {
        this.selectedPokemon.set(pokemon);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load Pokemon');
        this.loading.set(false);
      },
    });
  }
}
