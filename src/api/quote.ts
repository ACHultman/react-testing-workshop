export const getKanyeQuote = async () => {
  const data: any = await fetch("https://api.kanye.rest/");
  if (!data || !data.body) console.error("Kanye Rest could not be reached.");
  else {
    let quote = await data.json();
    quote = quote.quote;
    if (!quote || quote.length < 1) return "---";
    return quote;
  }
};
