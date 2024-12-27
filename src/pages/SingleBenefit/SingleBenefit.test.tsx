import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SingleBenefit from "./SingleBenefit";
import { getSingleBenefit } from "../../services/api";
import {
  isFavorite,
  addFavorite,
  removeFavorite,
} from "../../utils/favoritesHelpers";

// Mock de la API y utilidades
jest.mock("../../services/api", () => ({
  getSingleBenefit: jest.fn(),
}));

jest.mock("../../utils/favoritesHelpers", () => ({
  isFavorite: jest.fn(),
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
}));

const mockGetSingleBenefit = getSingleBenefit as jest.Mock;
const mockIsFavorite = isFavorite as jest.Mock;
const mockAddFavorite = addFavorite as jest.Mock;
const mockRemoveFavorite = removeFavorite as jest.Mock;

describe("SingleBenefit Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders benefit details when API call succeeds", async () => {
    const mockData = {
      body: {
        id: 1,
        comercio: "Comercio Test",
        descuento: 25,
        descripcion: "Descripción del beneficio",
        CategoriaGeneral: { nombre: "Categoría Test" },
        Dium: {
          id: 12,
          lunes: true,
          martes: true,
          miercoles: true,
          jueves: true,
          viernes: true,
          sabado: false,
          domingo: false,
          feriados: true,
          BeneficioId: 1,
        },
        aclaratoria: "Información adicional",
        vencimiento: "2024-12-31",
        Imagens: [{ url: "http://example.com/image.jpg" }],
      },
    };

    mockGetSingleBenefit.mockResolvedValueOnce(mockData);
    mockIsFavorite.mockReturnValueOnce(false);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/beneficio/1"]}>
          <Routes>
            <Route path="/beneficio/:id" element={<SingleBenefit />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/25% de descuento en Comercio Test/i)).toBeTruthy();
    expect(screen.getByText(/Descripción del beneficio/i)).toBeTruthy();
    expect(screen.getByText(/Categoría Test/i)).toBeTruthy();

    // Buscar todos los elementos con el texto "Información adicional"
    const infoElements = screen.getAllByText(/Información adicional/i);
    expect(infoElements.length).toBeGreaterThan(0);

    expect(
      screen.getByText(/Lunes, Martes, Miércoles, Jueves, Viernes, Feriados/i)
    ).toBeTruthy();
    expect(screen.getByText(/30\/12\/2024/i)).toBeTruthy();

    const image = screen.getByAltText(/Imagen de Comercio Test/i);
    expect(image.getAttribute("src")).toBe("http://example.com/image.jpg");
  });

  it("renders error message when API call fails", async () => {
    mockGetSingleBenefit.mockRejectedValueOnce(
      new Error("Error fetching benefit")
    );

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/beneficio/1"]}>
          <Routes>
            <Route path="/beneficio/:id" element={<SingleBenefit />} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(await screen.findByText(/Error fetching benefit/i)).toBeTruthy();
  });

  it("toggles favorite status when favorite button is clicked", async () => {
    const mockData = {
      body: {
        id: 1,
        comercio: "Comercio Test",
        descuento: 25,
        descripcion: "Descripción del beneficio",
        CategoriaGeneral: { nombre: "Categoría Test" },
        Dium: null,
        aclaratoria: null,
        vencimiento: "2024-12-31",
        Imagens: [],
      },
    };

    mockGetSingleBenefit.mockResolvedValueOnce(mockData);
    mockIsFavorite.mockReturnValueOnce(false);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/beneficio/1"]}>
          <Routes>
            <Route path="/beneficio/:id" element={<SingleBenefit />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const favoriteButton = screen.getByText(/Agregar a Favoritos 🤍/i);
    expect(favoriteButton).toBeTruthy();

    fireEvent.click(favoriteButton);

    expect(mockAddFavorite).toHaveBeenCalledWith("1");
    expect(screen.getByText(/Favorito ❤️/i)).toBeTruthy();

    fireEvent.click(screen.getByText(/Favorito ❤️/i));

    expect(mockRemoveFavorite).toHaveBeenCalledWith("1");
  });
});
