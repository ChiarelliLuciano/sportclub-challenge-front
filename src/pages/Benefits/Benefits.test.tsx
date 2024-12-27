import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Benefits from "./Benefits";
import { getBenefits } from "../../services/api";

jest.mock("../../services/api", () => ({
  getBenefits: jest.fn(),
}));

const mockGetBenefits = getBenefits as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Benefits Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders benefits when API call succeeds", async () => {
    const mockData = {
      body: {
        beneficios: [
          {
            id: 1,
            comercio: "Comercio 1",
            descuento: 20,
            Imagens: [{ url: "http://example.com/image1.jpg" }],
          },
          {
            id: 2,
            comercio: "Comercio 2",
            descuento: 15,
            Imagens: [{ url: "http://example.com/image2.jpg" }],
          },
        ],
        totalPages: 2,
      },
    };

    mockGetBenefits.mockResolvedValueOnce(mockData);

    await act(async () => {
      render(
        <MemoryRouter>
          <Benefits />
        </MemoryRouter>
      );
    });

    expect(screen.queryByText(/Comercio 1/i)).not.toBeNull();
    expect(screen.queryByText(/Comercio 2/i)).not.toBeNull();
  });

  it("renders error message when API call fails", async () => {
    mockGetBenefits.mockRejectedValueOnce(new Error("Error fetching benefits"));

    await act(async () => {
      render(
        <MemoryRouter>
          <Benefits />
        </MemoryRouter>
      );
    });

    expect(screen.queryByText(/Error fetching benefits/i)).not.toBeNull();
  });

  it("disables Previous button on the first page", async () => {
    const mockData = {
      body: {
        beneficios: [],
        totalPages: 1,
      },
    };

    mockGetBenefits.mockResolvedValueOnce(mockData);

    await act(async () => {
      render(
        <MemoryRouter>
          <Benefits />
        </MemoryRouter>
      );
    });

    const prevButton = screen.getByText(/Anterior/i);
    expect(prevButton.getAttribute("disabled")).toBe("");
  });
});
