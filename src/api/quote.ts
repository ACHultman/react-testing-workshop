import axios from "axios";

export const getKanyeQuote = async () => {
  try {
    const response = await axios.get("https://api.kanye.rest/");
    if (!response || response.status !== 200 || !response.data)
      throw new Error("Kanye Rest could not be reached.");
    else {
      let quote = await response.data.quote;
      if (!quote || quote.length < 1) return "---";
      return quote;
    }
  } catch (error) {
    //console.error(error);
  }
};
