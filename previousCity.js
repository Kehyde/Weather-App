window.onload = function getPreviousCities() {
  const stored = sessionStorage.getItem("weatherData");
  const weatherData = JSON.parse(stored);

  if (!stored) {
    window.location.href = "index.html";
  }

  if (Array.isArray(weatherData) && weatherData.length > 0) {
    const container = document.querySelector("#cityContainer");

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

async function clicked(city) {
  const apiKey = `5fdd291703674fb1854222708252003`;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const selectedCity = {
      cityName: data.location.name,
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      latitude: data.location.lat,
      longitude: data.location.lon,
    };

    sessionStorage.setItem("selectedCity", JSON.stringify(selectedCity));
    window.location.href = "weatherdisplay.html";
  } catch (err) {
    console.error("Failed to fetch weather:", err);
  }
}
