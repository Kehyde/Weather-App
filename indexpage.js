const cities = [];
const weatherData = [];
const searchButton = document.querySelector("#searchButton");
const inputBox = document.querySelector("#inputBox");

async function getWeather() {
  const apiKey = `5fdd291703674fb1854222708252003`;
  const cityName = inputBox.value;

  if (!cityName) {
    console.error("City name is required!");
    return;
  }

  const currentWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=no&alerts=no`;

  try {
    const response = await fetch(currentWeatherUrl);

    if (!response.ok) {
      throw new Error("Error Fetching Weather Data");
    }

    const data = await response.json();
    console.log(data);

    const weatherObject = {
      cityName: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      latitude: data.location.lat, //latidue and longitude will be used for the map don't forget!!!
      longitude: data.location.lon,
    };

    weatherData.push(weatherObject);

    sessionStorage.setItem("weatherData", JSON.stringify(weatherData));
  } catch (error) {
    console.error(
      "There was an error with fetch operation:",
      error.message || error
    );
  }
}

searchButton.addEventListener("click", async () => {
  const cityName = inputBox.value;
  if (cityName) {
    cities.push(cityName);
    await getWeather();
    window.location.href = "weatherdisplay.html";
  }
});

document
  .querySelector("#inputBox")
  .addEventListener("keypress", async function (e) {
    if (e.key === "Enter") {
      const cityName = inputBox.value;
      if (cityName) {
        cities.push(cityName);
        await getWeather();
        window.location.href = "weatherdisplay.html";
      }
    }
  });
