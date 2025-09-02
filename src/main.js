import "./style.css";
import { fetchRandomImage } from "./utils/unsplashApi.js";
import { fetchCrypto } from "./utils/coinGeckoApi.js";

async function getImage() {
  try {
    const photo = await fetchRandomImage();
    console.log(photo);
    setBackgroundImage(photo);
  } catch (error) {
    console.error(error);
    document.body.style.backgroundImage =
      "url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)";
    document.getElementById("image__author").textContent =
      "Photo by: Unsplash (fallback)";
  }
}

function setBackgroundImage(photo) {
  document.body.style.backgroundImage = `url(${photo.urls.full})`;
  document.getElementById(
    "image__author"
  ).textContent = `Photo by: ${photo.user.name}`;
}

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
    <div class="widget">
      <div class="widget__left">
        <img class="widget__icon" src="node_modules/cryptocurrency-icons/svg/white/${
          crypto.symbol
        }.svg" alt="${crypto.name} logo" />
        <span class="widget__price">$${crypto.market_data.current_price.usd.toLocaleString()}</span>
      </div>
      <span class="widget__label">${crypto.name} (${crypto.symbol})</span>
    </div>`;
}

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

// Update crypto every 60 seconds
setInterval(getCrypto, 60000);
