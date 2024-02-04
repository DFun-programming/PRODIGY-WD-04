document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "4daaba8c4337df0e57a588d25d8317af";
    const locationForm = document.getElementById("location-form");

    locationForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const locationInput = document.getElementById("location-input");
        const location = locationInput.value;
        const weatherData = await fetchWeatherDataByLocation(location, apiKey);
        updateUI(weatherData);
    });
});

async function fetchWeatherDataByLocation(location, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateUI(weatherData) {
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");

    const location = weatherData.name;
    const temperature = `${Math.round(weatherData.main.temp)}°C`;
    const description = weatherData.weather[0].description;

    locationElement.textContent = location;
    temperatureElement.textContent = temperature;
    descriptionElement.textContent = description;

    // Update background based on weather
    updateBackground(weatherData.weather[0].main);
}

function updateBackground(weatherCondition) {
    const body = document.body;

    switch (weatherCondition) {
        case "Clear":
            body.style.backgroundImage = "url('assets/imgs/cloud-blue-sky.jpg')";
            break;
        case "Clouds":
            body.style.backgroundImage = "url('assets/imgs/blue-sky-with-clouds.jpg')";
            break;
        case "Rain":
            body.style.backgroundImage = "url('assets/imgs/weather-effects-composition (1).jpg')";
            break;
        case "Drizzle":
            body.style.backgroundImage = "url('assets/imgs/weather-effects-composition (1).jpg')";
            break;
        case "Snow":
            body.style.backgroundImage = "url('assets/imgs/low-angle-shot-person-walking-snow-covered-sidewalk-snow.jpg')";
            break;
        case "Thunderstorm":
            body.style.backgroundImage = "url('assets/imgs/vertical-shot-lightning-hitting-tree-night-with-purple-sky-trees-front.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('assets/imgs/cloud-blue-sky.jpg')";
            break;
    }
}
