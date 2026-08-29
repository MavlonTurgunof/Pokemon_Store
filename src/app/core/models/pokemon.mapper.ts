import { Pokemon, PokemonCardItem } from './pokemon';

export function toCardItem(pokemon: Pokemon): PokemonCardItem {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image:
      pokemon.sprites.other['official-artwork'].front_default ??
      pokemon.sprites.front_default ??
      '',
    height: pokemon.height,
    experience: pokemon.base_experience,
    order: pokemon.order,
  };
}
