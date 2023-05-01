import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PokemonState } from '../types';

const initialState: PokemonState = {
    data: null,
    status: 'idle',
    error: null,
    cardImages: []
}

export const fetchPokemonData = createAsyncThunk(
    'pokemon/fetchPokemonData',
    async (id: string) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return response.data;
    }
);

export const fetchRandomPokemonImages = createAsyncThunk(
    'pokemon/fetchRandomPokemonImages',
    async () => {
        const generateRandomNumbers = (count: number, max: number) => {
            const numbers = new Set<number>();

            while (numbers.size < count) {
                const randomNumber = Math.floor(Math.random() * max) + 1;
                numbers.add(randomNumber);
            }

            return Array.from(numbers);
        };

        const randomNumbers = generateRandomNumbers(5, 151);
        const requests = randomNumbers.map((number) =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`)
        );

        try {
            const responses = await Promise.all(requests);
            const pokemon = responses.map((response) => {
                const { id, name, sprites } = response.data;
                return {
                    id: Math.random(),
                    pokemonId: id,
                    name,
                    src: sprites.front_default,
                    matched: false,
                };
            });

            return pokemon;
        } catch (error) {
            console.error('Error fetching random Pokémon:', error);
            throw error;
        }
    }
);

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonData.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchPokemonData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        });
        builder.addCase(fetchPokemonData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });
        builder.addCase(fetchRandomPokemonImages.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(fetchRandomPokemonImages.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.cardImages = action.payload;
        });
        builder.addCase(fetchRandomPokemonImages.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || null;
        });
    }
});

export default pokemonSlice.reducer;
