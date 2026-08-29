export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface Pokemon {
  id: number;
  name: string;

  height: number;
  weight: number;

  base_experience: number;
  order: number;

  sprites: {
    front_default: string | null;

    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };

  types: PokemonType[];
  stats: PokemonStat[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonCardItem {
  id: number;
  name: string;
  image: string;

  height: number;
  experience: number;
  order: number;
}
