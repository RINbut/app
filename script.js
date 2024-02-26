const imageBgElement = document.querySelector("#image-bg");
const locationElement = document.querySelector("#location");
const dateElement = document.querySelector("#date");
const temperatureBigElement = document.querySelector("#temperature-big");
const weatherIconElement = document.querySelector("#weather-icon");
const weatherTypeElement = document.querySelector("#weather-type");
const temperatureElement = document.querySelector("#temperature");
const rainProbabilityElement = document.querySelector("#rain-probability");
const humidityElement = document.querySelector("#humidity");
const overlayBtnElement = document.querySelector("#overlay-btn");
const overlayLocationsElement = document.querySelector("#overlay-locations");
const locationsButtons = document.querySelectorAll("#overlay-locations button");
const preloaderElement = document.querySelector("#preloader");

locationsButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    fetchWeather(e.currentTarget.dataset.city);
    overlayBtnElement.classList.remove("open");
    overlayLocationsElement.classList.remove("open");
  });
});

const weatherTypes = {
  Sunny: "clear",
  "Sunny ": "clear",
  "Clear ": "clear",
  Clear: "clear",
  "Partly cloudy": "haze",
  Cloudy: "haze",
  "Cloudy ": "haze",
  Overcast: "cloudy",
  "Overcast ": "cloudy",
  "Light rain shower": "rainy",
  "Light rain": "rainy",
  "Light sleet showers": "rainy",
  "Heavy rain shower": "rainy",
  "Heavy rain": "rainy",
  "Patchy rain nearby": "rainy",
  "Moderate or heavy rain shower": "rainy",
  "Torrential rain shower": "rainy",
  "Patchy light drizzle": "rainy",
  "Patchy light raing": "rainy",
  "Light drizzle": "rainy",
  "Moderate rain at times": "rainy",
  "Moderate or heavy sleet showers": "rainy",
  "Heavy rain at times": "rainy",
  "Patchy light rain in area with thunder": "rainy",
  "Moderate or heavy rain in area with thunder": "rainy",
  "Moderate rain": "rainy",
  "Light freezing rain": "rainy",
  "Moderate or heavy freezing rain": "rainy",
  Mist: "foggy",
  "Mist ": "foggy",
  Fog: "foggy",
  "Fog ": "foggy",
  "Freezing fog": "foggy",
  "Light sleet": "foggy",
  "Moderate snow": "snowy",
  "Moderate or heavy sleet": "snowy",
  "Freezing frizzle": "snowy",
  "Heavy freezing frizzle": "snowy",
  "Patchy moderate snow": "snowy",
  "Patchy light snow": "snowy",
  "Ice pellets": "snowy",
  "Patchy heavy snow": "snowy",
  "Patchy light snow in area with thunder": "snowy",
  "Moderate or heavy snow in area with thunder": "snowy",
  "Heavy snow": "snowy",
  "Moderate or heavy snow showers": "snowy",
  "Light showers of ice pellets": "snowy",
  "Moderate or heavy showers of ice pellets": "snowy",
  "Light snow showers": "snowy",
  "Light snow": "snowy",
  "Patchy snow nearby": "rainy",
  "Patchy sleet nearby": "rainy",
  "Patchy freezing drizzle nearby": "rainy",
  "Blowing snow": "snowy",
  Blizzard: "snowy",
  "Blizzard ": "snowy",
};

overlayBtnElement.addEventListener("click", () => {
  overlayBtnElement.classList.toggle("open");
  overlayLocationsElement.classList.toggle("open");
});

async function fetchWeather(loc) {
  preloaderElement.style.display = "flex";
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${loc}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cb90a4b893msh3da381af1519a08p19a16djsnae1518602c3f",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    imageBgElement.src = `./image/${
      weatherTypes[result.current.condition.text]
    }.jpg`;
    locationElement.textContent = result.location.name;
    dateElement.textContent = moment().format("dddd, MMMM D, YYYY");
    temperatureBigElement.innerHTML = `${Math.round(
      result.current.temp_c
    )}&deg;C`;
    weatherIconElement.src = result.current.condition.icon.replace(
      "64x64",
      "128x128"
    );
    weatherTypeElement.textContent = result.current.condition.text;
    temperatureElement.innerHTML = `${result.current.feelslike_c}&deg;C`;
    humidityElement.textContent = `${result.current.humidity}%`;
    rainProbabilityElement.textContent = `${result.current.precip_mm} mm`;
    imageBgElement.addEventListener("load", () => {
      preloaderElement.style.display = "none";
    });
  } catch (error) {
    console.error(error);
  }
}
fetchWeather("Paris");
