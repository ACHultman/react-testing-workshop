import { cleanup, render } from "@testing-library/react";
import ListItem from "../list-item";

describe("ListItem component", () => {
  afterEach(() => {
    cleanup();
  });

  it("matches snapshot", () => {
    const { baseElement } = render(<ListItem text={""} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("renders proper text", () => {
    const mockText = "test";
    const { getByText } = render(<ListItem text={mockText} />);
    getByText(mockText);
  });
});
