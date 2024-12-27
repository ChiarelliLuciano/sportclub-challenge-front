import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe("main.tsx", () => {
  it("calls createRoot and renders App", () => {
    const rootDiv = document.createElement("div");
    rootDiv.id = "root";
    document.body.appendChild(rootDiv);

    require("./main");

    expect(createRoot).toHaveBeenCalledWith(rootDiv);

    const renderMock = (createRoot as jest.Mock).mock.results[0].value.render;
    expect(renderMock).toHaveBeenCalledWith(<App />);
  });
});
