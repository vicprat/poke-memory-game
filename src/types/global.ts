export type PokemonDetailsParams = {
    id: string;
};

export interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        }
    }[];
}

export interface Card {
    id: number;
    pokemonId: number;
    name: string;
    src: string;
    matched: boolean;
}

export type Cards = Card[];

export interface PokemonState {
    data: Pokemon | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    cardImages: Card[];
}

export interface GameState {
    turns: number;
    fails: number;
}
