import "./current-weather.css";
import React from "react";

// Assuming 'data' is the prop containing the detailed weather data
const Current_weather = ({ data }) => {
  // Destructure the necessary data
  const { city, main, weather, wind } = data;
  const { temp, feels_like, humidity, pressure } = main;
  const weatherDetails = weather[0]; // Assuming there's at least one item in the weather array
  const { description, icon } = weatherDetails;
  const { speed: windSpeed } = wind;

  // Convert temperature from Kelvin to Celsius (for displaying purpose)
  const tempCelsius = (temp - 273.15).toFixed(1);
  const feelsLikeCelsius = (feels_like - 273.15).toFixed(1);

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{city}</p>
          <p className="weather-desc">{description}</p>
        </div>
        <img src={`icons/${icon}.png`} alt="weather icon" className="weather-icon" />
      </div>
      <div className="bottom">
        <p className="temperature">{tempCelsius}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{feelsLikeCelsius}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{windSpeed} m/s</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Current_weather;
