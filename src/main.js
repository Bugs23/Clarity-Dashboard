import "./style.css";
import { fetchRandomImage } from "./utils/unsplashApi.js"; // adjust the path if needed

async function getImage() {
  try {
    const photo = await fetchRandomImage();
    console.log(photo);
    setBackgroundImage(photo);
  } catch (error) {
    console.error(error);
  }
}

getImage();

function setBackgroundImage(photo) {
  document.body.style.backgroundImage = `url(${photo.urls.full})`;
  document.getElementById(
    "image__author"
  ).textContent = `Photo by: ${photo.user.name}`;
}
