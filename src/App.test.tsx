import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders home text", () => {
    render(<App />);
    const linkElement = screen.getByText(/home/i);
    expect(linkElement).toBeInTheDocument();
  });
});
