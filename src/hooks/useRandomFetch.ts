import { useState, useEffect } from "react";
import axios from "axios";
interface Card {
    id: number;
    pokemonId: number;
    name: string;
    src: string;
    matched: boolean;
}

export const useRandomFetch = (count?: number, max?: number) => {
    const [data, setData] = useState<Card[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const generateRandomNumbers = (count: number, max: number) => {
        const numbers = new Set<number>();

      while (numbers.size < count) {
          const randomNumber = Math.floor(Math.random() * max) + 1;
          numbers.add(randomNumber);
      }

      return Array.from(numbers);
  };

    useEffect(() => {
      if (count !== undefined && max !== undefined) {
        const fetchCardImages = async () => {
            setLoading(true);

          const randomNumbers = generateRandomNumbers(count, max);
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

            setData(pokemon);
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            } else {
                  setError(new Error("An unknown error occurred"));
              }
          } finally {
              setLoading(false);
          }
      };

        fetchCardImages();
    } else {
        setData(null);
        setLoading(false);
    }
  }, [count, max]);

    return { data, loading, error };
};
