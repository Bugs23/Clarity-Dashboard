export async function fetchCrypto() {
  // You can change the query to fetch different types of coins
  const query = "bitcoin";

  // Fetch data from CoinGecko API with the query
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${query}`);

  // Check if the response is ok
  if (!res.ok) {
    throw new Error("Failed to fetch coin");
  }

  const data = await res.json();

  // Check if there are results
  if (data && data.id === query) {
    return data;
  } else {
    throw new Error("No coin found");
  }
}
