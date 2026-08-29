import { Component, inject, OnInit } from '@angular/core';
import { PokemonStore } from '../../store/pokemon.store';
import { Router } from '@angular/router';
import { PokemonCard } from '../../shared/components/pokemon-card/pokemon-card';
import { ScrollTrigger } from '../../shared/components/scroll-trigger/scroll-trigger';
import { Container } from '../../shared/components/container/container';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard, ScrollTrigger, Container],
  standalone: true,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList implements OnInit {
  private readonly store = inject(PokemonStore);
  private readonly router = inject(Router);

  pokemonList = this.store.pokemonList;
  loading = this.store.loading;
  error = this.store.error;
  hasMore = this.store.hasMore;
  private nextPage = 1;

  ngOnInit() {
    this.store.loadPokemon(1);
  }

  onScrollEnd() {
    if (this.loading() || !this.hasMore()) return;
    this.nextPage++;
    this.store.loadPokemon(this.nextPage);
  }

  onCardClick(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
}
