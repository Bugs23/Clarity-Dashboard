import "./style.css";
import { fetchRandomImage } from "./utils/unsplashApi.js";
import { fetchCrypto } from "./utils/coinGeckoApi.js";
import { fetchWeather } from "./utils/openWeatherApi.js";
import { getLocation } from "./utils/geoLocation.js";

// Fetch and display a random image from Unsplash
async function getImage() {
  try {
    const photo = await fetchRandomImage();
    setBackgroundImage(photo);
  } catch (error) {
    console.error(error);
    document.body.style.backgroundImage =
      "url(/images/placeholder-background.jpg)";
    document.getElementById("image__author").textContent = "Photo by: v2osk";
  }
}

function setBackgroundImage(photo) {
  // Set a low-res thumbnail as the initial background
  document.body.style.backgroundImage = `url(${photo.urls.thumb})`;

  // Preload the high-res image
  const image = new Image();
  image.src = photo.urls.full;
  image.onload = () => {
    document.body.style.backgroundImage = `url(${image.src})`;
  };

  document.getElementById(
    "image__author"
  ).textContent = `Photo by: ${photo.user.name}`;
}

// Fetch and display cryptocurrency data from CoinGecko
async function getCrypto() {
  try {
    const crypto = await fetchCrypto();
    console.log(crypto);
    setCrypto(crypto);
  } catch (error) {
    console.error(error);
    document.getElementById("crypto-info").textContent = "Bitcoin (fallback)";
  }
}

function setCrypto(crypto) {
  document.getElementById("crypto").innerHTML = `
    <a href="${
      crypto.links.homepage[0]
    }" class="widget-link" target="_blank" rel="noreferrer">
      <div class="widget">
        <div class="widget__value">
          <img class="widget__icon" src="node_modules/cryptocurrency-icons/svg/white/${
            crypto.symbol
          }.svg" alt="${crypto.name} logo" />
          <span class="widget__price">$${crypto.market_data.current_price.usd.toLocaleString()}</span>
        </div>
        <span class="widget__label">${crypto.name} (${crypto.symbol})</span>
      </div>
    </a>`;
}

// Fetch and display weather data from OpenWeather API
async function getWeather() {
  try {
    const { latitude, longitude } = await getLocation();
    const weather = await fetchWeather(latitude, longitude);
    setWeather(weather);
  } catch (error) {
    console.error(error);
    document.getElementById("weather").textContent = "Weather (fallback)";
  }
}

function setWeather(weather) {
  document.getElementById("weather").innerHTML = `
    <a href="https://openweathermap.org/city/${
      weather.id
    }" class="widget-link" target="_blank" rel="noreferrer">
      <div class="widget">
        <div class="widget__value">
          <img class="widget__icon" src="https://openweathermap.org/img/wn/${
            weather.weather[0].icon
          }@4x.png" alt="${weather.weather[0].description}" />
          <span class="widget__price">${Math.round(weather.main.temp)}º</span>
        </div>
        <span class="widget__label">${weather.name}</span>
      </div>
    </a>`;
}

// Display current time
function getTime() {
  const time = new Date();
  const currentTime = time.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });
  document.getElementById("time").textContent = currentTime;
}

getTime();
// Update time every second
setInterval(getTime, 1000);
getImage();
getCrypto();
getWeather();
// Update crypto every 60 seconds
setInterval(getCrypto, 60000);
