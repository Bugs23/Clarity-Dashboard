export async function fetchRandomImage() {
  const query = "nature";

  const res = await fetch(
    `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${query}`
  );

  // Check if the response is ok
  if (!res.ok) {
    throw new Error("Failed to fetch photos");
  }

  const data = await res.json();

  // Check if there are results
  if (data && data.urls && data.urls.regular) {
    console.log("Random photo URL:", data.urls.regular);
    return data;
  } else {
    throw new Error("No photo found");
  }
}
