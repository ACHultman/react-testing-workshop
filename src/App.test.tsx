import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders home text", () => {
  render(<App />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
