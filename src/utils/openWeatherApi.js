const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export async function fetchWeather(latitude, longitude) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=imperial`
  );

  if (!res.ok) {
    throw new Error("Failed to get weather");
  }

  const data = await res.json();

  if (data && data.weather) {
    return data;
  } else {
    throw new Error("No weather found");
  }
}
