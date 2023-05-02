import '@testing-library/jest-dom';
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import store from "../store/store"
import PokemonDetails from "../pages/PokemonDetails"

// Mock the useParams and useFetch hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: "25" }),
}));

jest.mock('../hooks/useFetch', () => ({
  useFetch: () => ({
    data: {
      name: "Pikachu",
      sprites: {
        front_default: "https://pokeapi.co/sprites/pokemon/25.png"
      },
      height: 4,
      weight: 60,
      types: [
        {
          type: {
            name: "electric"
          }
        }
      ]
    },
    loading: false,
    error: null
  }),
}));

describe('PokemonDetails_function', () => {
    // Tests that Pokemon data is successfully fetched and displayed.
    it("test_pokemon_data_displayed", async () => {
        const { getByText, getByAltText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <PokemonDetails />
                </MemoryRouter>
            </Provider>
        );
        expect(getByAltText("Pikachu")).toBeInTheDocument();
        expect(getByText("Pikachu")).toBeInTheDocument();
        expect(getByText("Height: 4")).toBeInTheDocument();
        expect(getByText("Weight: 60")).toBeInTheDocument();
        expect(getByText("Type: electric")).toBeInTheDocument();
    });
});
