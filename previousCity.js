window.onload = function getPreviousCities() {
  const stored = sessionStorage.getItem("weatherData");
  const weatherData = JSON.parse(stored);

  // checks to see if any weatherData is stored if not, return to main page.
  if (!stored) {
    window.location.href = "index.html";
  }

  // check to see that weatherData is an array and contains data.
  if (Array.isArray(weatherData) && weatherData.length > 0) {
    const container = document.querySelector("#cityContainer");

    // for each city create a div element and create the following HTML while assigning each card a city name, and an index.
    cities.forEach((city, index) => {
      const card = document.createElement("div");
      card.className = "cityCard";
      card.id = `cityCard-${index}`;
      card.innerHTML = `
            <h3 id="previousH3">${city.cityName}</h3>
            <p id="previousP">Previously ${city.temperature} c°</p>
        `;
      card.addEventListener("click", () => clicked(city.cityName));
      container.appendChild(card);
    });
  }
};

// Assigned api key and URL.
async function clicked(city) {
  const apiKey = `5fdd291703674fb1854222708252003`;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

  // try fetching and storing response as JSON.
  try {
    const res = await fetch(url);
    const data = await res.json();

    // create a selected city object.
    const selectedCity = {
      cityName: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      latitude: data.location.lat,
      longitude: data.location.lon,
      precipitation: data.current.precip_mm,
      uvIndex: data.current.uv,
    };

    // store object as JSON in sessionStorage.
    sessionStorage.setItem("selectedCity", JSON.stringify(selectedCity));
    window.location.href = "weatherdisplay.html";

    // if there is an error, catch it, and console.log an error.
  } catch (err) {
    console.error("Failed to fetch weather:", err);
  }
}

// goBackButton made clickable
document.querySelector("#goBackBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});
