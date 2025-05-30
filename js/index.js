const url =
  "https://api.open-meteo.com/v1/forecast?latitude=35.7721&longitude=-78.6386&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch";

async function getWeatherData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    console.log(data);
    if (data.current) {
      const temperature = data.current.temperature_2m;
      const windSpeed = data.current.wind_speed_10m;
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
        "temperature"
      ).innerHTML = `<p>Temperature:\n <strong>${temperature}°F</strong></p>`;
      document.getElementById(
        "wind-speed"
      ).innerHTML = `<p>Wind:\n <strong>${windSpeed} mph</strong></p>`;
      document.getElementById(
        "weather-code"
      ).innerHTML = `<p><strong>${weatherCodes[weatherCode]}</strong></p>`;
    }
  } catch (error) {
    console.log(error);

    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = `<p>Error: ${error.message}</p>`;
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "20px";
    document.getElementById("temperature").appendChild(errorMessage);
    document.getElementById("wind-speed").style.display = "none";
    document.getElementById("weather-code").style.display = "none";
  }
}

// Call the function to get weather data
getWeatherData();

let createFooter = document.createElement("footer");
document.body.appendChild(createFooter);

let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = "&copy; Victor Lameda Rojas " + thisYear;
footer.appendChild(copyright);
