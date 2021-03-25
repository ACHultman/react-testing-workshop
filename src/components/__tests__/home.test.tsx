import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { getKanyeQuote } from "../../api/quote";
import Home from "../home";

jest.mock("../../api/quote", () => ({
  getKanyeQuote: jest.fn(),
}));

describe("Home component", () => {
  afterEach(() => {
    cleanup();
  });

  it("matches snapshot", () => {
    const { baseElement } = render(<Home name={""} />);
    expect(baseElement).toMatchSnapshot();
  });

  describe("textForm", () => {
    it("adds text to list when full text is submitted", async () => {
      const mockInputVal = "test text";
      const { getByTestId, findByText } = render(<Home name={""} />);

      // get input and change it and submit
      const input: HTMLInputElement = getByTestId(
        "text-input"
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: mockInputVal } });
      fireEvent.submit(getByTestId("form"));
      //test if list updated
      const listItem = await findByText(mockInputVal);
      expect(listItem).toBeTruthy();
    });

    it("adds multiple entries to list when full text is submitted", async () => {
      const mockInputVal = "test text";
      const { getByTestId, findAllByTestId } = render(<Home name={""} />);

      // get input and change it and submit
      const input: HTMLInputElement = getByTestId(
        "text-input"
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: mockInputVal } });
      fireEvent.submit(getByTestId("form"));
      fireEvent.change(input, { target: { value: mockInputVal } });
      fireEvent.submit(getByTestId("form"));
      //test if list updated
      const listItems = await findAllByTestId("list-item");
      expect(listItems).toHaveLength(2);
    });

    it("does nothing when empty text is submitted", async () => {
      const { getByTestId, queryByRole } = render(<Home name={""} />);

      // get input and change it and submit
      const input: HTMLInputElement = getByTestId(
        "text-input"
      ) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.submit(getByTestId("form"));
      //test if list updated
      const listItems = queryByRole("listitem");
      expect(listItems).toBeNull();
    });
  });

  describe("kanye time button", () => {
    it("adds multiple quotes to list", async () => {
      const mockQuote = "I am the best";
      const { queryAllByTestId, getByRole, queryByTestId } = render(
        <Home name={""} />
      );
      const kanyeButton = getByRole("button", {
        name: /kanye time/i,
      });
      (getKanyeQuote as jest.Mock<any, any>).mockReturnValueOnce(mockQuote);
      fireEvent.click(kanyeButton);
      // wait for first list item
      await waitFor(() => expect(queryByTestId("list-item")).not.toBeNull());
      // click for second time
      (getKanyeQuote as jest.Mock<any, any>).mockReturnValueOnce(
        mockQuote + "2"
      );
      fireEvent.click(kanyeButton);
      // evaluate success
      await waitFor(() =>
        expect(queryAllByTestId("list-item")).toHaveLength(2)
      );
      expect(getKanyeQuote).toHaveBeenCalledTimes(2);
    });
  });
});
