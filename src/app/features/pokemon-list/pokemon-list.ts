import { Component, inject, OnInit } from '@angular/core';
import { PokemonStore } from '../../store/pokemon.store';
import { Router } from '@angular/router';
import { PokemonCard } from '../../shared/components/pokemon-card/pokemon-card';
import { Pagination } from '../../shared/components/pagination/pagination';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard, Pagination],
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
  currentPage = this.store.currentPage;
  totalPokemon = this.store.totalPokemon;

  ngOnInit() {
    this.store.loadPokemon(2);
  }

  onPageChange(page: number) {
    this.store.loadPokemon(page);
  }

  onCardClick(id: number) {
    this.router.navigate(['/pokemon', id]);
  }
}
