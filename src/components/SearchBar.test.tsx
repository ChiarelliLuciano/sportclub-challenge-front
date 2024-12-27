import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getByValue } from "../services/api";

jest.mock("../services/api", () => ({
  getByValue: jest.fn(),
}));

const mockGetByValue = getByValue as jest.Mock;

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SearchBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the input field", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar beneficio");
    expect(input).not.toBeNull();
  });

  it("fetches and displays suggestions when typing", async () => {
    const mockSuggestions = {
      body: {
        beneficios: [
          {
            id: 1,
            comercio: "Comercio Test",
            descuento: 10,
            Imagens: [{ url: "http://example.com/image1.jpg" }],
          },
        ],
      },
    };

    mockGetByValue.mockResolvedValueOnce(mockSuggestions);

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar beneficio");
    fireEvent.change(input, { target: { value: "Test" } });

    await waitFor(() => {
      expect(mockGetByValue).toHaveBeenCalledWith("Test");
      expect(screen.getByText("Comercio Test")).not.toBeNull();
    });
  });

  it("clears suggestions when clicking the clear button", async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar beneficio");
    fireEvent.change(input, { target: { value: "Test" } });

    const clearButton = await waitFor(() =>
      screen.getByRole("button", { name: "✖" })
    );
    fireEvent.click(clearButton);

    expect(input.getAttribute("value")).toBe("");
    expect(screen.queryByText("Comercio Test")).toBeNull();
  });

  it("navigates to the selected suggestion", async () => {
    const mockSuggestions = {
      body: {
        beneficios: [
          {
            id: 1,
            comercio: "Comercio Test",
            descuento: 10,
            Imagens: [{ url: "http://example.com/image1.jpg" }],
          },
        ],
      },
    };

    mockGetByValue.mockResolvedValueOnce(mockSuggestions);

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar beneficio");
    fireEvent.change(input, { target: { value: "Test" } });

    const suggestion = await waitFor(() => screen.getByText("Comercio Test"));
    fireEvent.click(suggestion);

    expect(mockNavigate).toHaveBeenCalledWith("/beneficio/1");
  });

  it("handles API errors gracefully", async () => {
    mockGetByValue.mockRejectedValueOnce(new Error("API Error"));

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Buscar beneficio");
    fireEvent.change(input, { target: { value: "Test" } });

    await waitFor(() => {
      expect(screen.queryByText("Comercio Test")).toBeNull();
    });
  });
});
