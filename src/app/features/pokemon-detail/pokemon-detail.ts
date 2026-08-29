import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonStore } from '../../store/pokemon.store';
import { NgOptimizedImage } from '@angular/common';
import { Container } from '../../shared/components/container/container';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  imports: [NgOptimizedImage, Container],
})
export class PokemonDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(PokemonStore);

  pokemon = this.store.selectedPokemon;
  loading = this.store.loading;
  error = this.store.error;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.store.loadPokemonById(id);
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
