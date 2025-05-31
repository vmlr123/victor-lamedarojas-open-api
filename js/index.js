// This script fetches the current weather data from the Open-meteo API and displays it on the web page

// Clear weather data content on page load

function clearContent() {
  document.getElementById("temperature").style.display = "none";
  document.getElementById("wind-speed").style.display = "none";
  document.getElementById("weather-code").style.display = "none";
  document.getElementById("loader").style.display = "none";
}
clearContent();

// Function to set the background color based on the time of day

async function setTimeOfDay() {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=35.7721&longitude=-78.6386&current";
    document.getElementById("loader").style.display = "";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    console.log(data);
    if (data.current) {
      // Clear previous content
      clearContent();
      let time = data.current.time.split("T")[1].split(":")[0] - 4;
      // Display sun or moon based on time
      const isNight = time >= 19 || time <= 6;
      if (isNight) {
        const sun = document.getElementById("sun");
        sun.style.background = "white";
        sun.style.boxShadow = "0 0 100px white";
        document.body.style.background = "#272757";
      }
    }
  } catch (error) {
    console.log(error);
  }
}
// Call function to set background based on time of day
setTimeOfDay();

// Functions to get the current temperature, wind speed, and weather condition and display them in the HTML

// Function to get the current temperature
async function getCurrentTemperature() {
  // Clear previous content
  clearContent();
  document.getElementById("loader").style.display = "";
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=35.7721&longitude=-78.6386&current=temperature_2m&temperature_unit=fahrenheit";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    console.log(data);
    if (data.current) {
      const temperature = data.current.temperature_2m;
      document.getElementById(
        "temperature"
      ).innerHTML = `<p>Temperature:\n <strong>${temperature}°F</strong></p>`;
      document.getElementById("temperature").style.display = "";
    }
  } catch (error) {
    console.log(error);

    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = `<p>Error: ${error.message}</p>`;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "20px";
    document.getElementById("temperature").appendChild(errorMessage);
    document.getElementById("temperature").style.display = "";
  }
  document.getElementById("loader").style.display = "none";
  document
    .getElementById("temperature-link")
    .scrollIntoView({ behavior: "smooth" });
}

// Function to get the current wind speed
async function getCurrentWindSpeed() {
  // Clear previous content
  clearContent();
  document.getElementById("loader").style.display = "";
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=35.7721&longitude=-78.6386&current=wind_speed_10m&wind_speed_unit=mph";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    console.log(data);
    if (data.current) {
      const windSpeed = data.current.wind_speed_10m;
      document.getElementById(
        "wind-speed"
      ).innerHTML = `<p>Wind:\n <strong>${windSpeed} mph</strong></p>`;
      document.getElementById("wind-speed").style.display = "";
    }
  } catch (error) {
    console.log(error);

    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = `<p>Error: ${error.message}</p>`;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "20px";
    document.getElementById("wind-speed").appendChild(errorMessage);
    document.getElementById("wind-speed").style.display = "";
    document.getElementById("temperature").style.display = "none";
    document.getElementById("weather-code").style.display = "none";
  }
  document.getElementById("loader").style.display = "none";
  document
    .getElementById("temperature-link")
    .scrollIntoView({ behavior: "smooth" });
}

// Function to get the current weather condition
async function getCurrentWeatherCondition() {
  // Clear previous content
  clearContent();
  document.getElementById("loader").style.display = "";
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=35.7721&longitude=-78.6386&current=weather_code";
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    console.log(data);
    if (data.current) {
      const weatherCode = data.current.weather_code;
      // Display the data in the HTML
      const weatherCodes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle: Light intensity",
        53: "Drizzle: Moderate intensity",
        55: "Drizzle: Dense intensity",
        56: "Freezing Drizzle: Light intensity",
        57: "Freezing Drizzle: Heavy intensity",
        61: "Rain: Slight intensity",
        63: "Rain: Moderate intensity",
        65: "Rain: Heavy intensity",
        66: "Freezing Rain: Light intensity",
        67: "Freezing Rain: Heavy intensity",
        71: "Snow fall: Slight intensity",
        73: "Snow fall: Moderate intensity",
        75: "Snow fall: Heavy intensity",
        77: "Snow grains",
        80: "Rain showers: Slight intensity",
        81: "Rain showers: Moderate intensity",
        82: "Rain showers: Violent intensity",
        85: "Snow showers: Slight intensity",
        86: "Snow showers: Heavy intensity",
        95: "Thunderstorm: Slight or moderate",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
      };
      document.getElementById(
        "weather-code"
      ).innerHTML = `<p><strong>${weatherCodes[weatherCode]}</strong></p>`;
      document.getElementById("weather-code").style.display = "";
    }
  } catch (error) {
    console.log(error);

    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = `<p>Error: ${error.message}</p>`;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "20px";
    document.getElementById("weather-code").appendChild(errorMessage);
    document.getElementById("temperature").style.display = "none";
    document.getElementById("wind-speed").style.display = "none";
    document.getElementById("weather-code").style.display = "";
  }
  document.getElementById("loader").style.display = "none";
  document
    .getElementById("temperature-link")
    .scrollIntoView({ behavior: "smooth" });
}

// Add event listeners to the links

const temperatureLink = document.getElementById("temperature-link");
temperatureLink.addEventListener("click", function () {
  getCurrentTemperature();
});

const windSpeedLink = document.getElementById("wind-speed-link");
windSpeedLink.addEventListener("click", function () {
  getCurrentWindSpeed();
});

const weatherCodeLink = document.getElementById("weather-code-link");
weatherCodeLink.addEventListener("click", function () {
  getCurrentWeatherCondition();
});

// Create footer element and append it to the body
let createFooter = document.createElement("footer");
document.body.appendChild(createFooter);

let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = "&copy; Victor Lameda Rojas " + thisYear;
footer.appendChild(copyright);
