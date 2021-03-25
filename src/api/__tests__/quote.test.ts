/* eslint-disable jest/no-conditional-expect */
import { getKanyeQuote } from "../quote";
import axios from "axios";

// mocks
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const placeholder = "---";

describe("quote", () => {
  describe("getKanyeQuote", () => {
    it("returns correct quote", async () => {
      const fakeResponse = {
        data: {
          quote: "test quote",
        },
        status: 200,
      };
      mockedAxios.get.mockResolvedValue(fakeResponse);
      expect(await getKanyeQuote()).toBe(fakeResponse.data.quote);
    });

    it('throws error "Kanye Rest could not be reached."', async () => {
      const fakeFailedResponse = {
        data: {
          quote: null,
        },
        status: 500,
      };
      mockedAxios.get.mockResolvedValue(fakeFailedResponse);
      try {
        await getKanyeQuote();
      } catch (error) {
        expect(error).toBe("Kanye Rest could not be reached.");
      }
    });

    it("returns placeholder", async () => {
      const fakeEmptyResponse = {
        data: {
          quote: "",
        },
        status: 200,
      };
      mockedAxios.get.mockResolvedValue(fakeEmptyResponse);
      expect(await getKanyeQuote()).toBe(placeholder);
    });
  });
});
