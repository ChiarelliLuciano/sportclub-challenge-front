import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe("NotFound Component", () => {
  it("renders the 404 message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeTruthy();

    expect(screen.getByText(/Página no encontrada!/i)).toBeTruthy();

    const linkElement = screen.getByText(/atrás/i);
    expect(linkElement).toBeTruthy();

    const href = linkElement.closest("a")?.getAttribute("href");
    expect(href).toBe("/beneficios");
  });
});
