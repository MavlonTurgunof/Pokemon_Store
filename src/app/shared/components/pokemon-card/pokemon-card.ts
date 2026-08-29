import { Component, input, output } from '@angular/core';
import { PokemonCardItem } from '../../../core/models/pokemon';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  imports: [NgOptimizedImage],
  standalone: true,
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input.required<PokemonCardItem>();
  showMore = output<number>();

  onShowMore() {
    this.showMore.emit(this.pokemon().id);
  }
}
