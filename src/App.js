import React, { useEffect, useState } from "react";
import "./App.css";
import Current_weather from "./components/Current_weather.js";
import Search from "./components/Search.js";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api.js";
import Forecast from "./components/Forecast.js";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to fetch weather data
  const fetchWeather = (lat, lon, label = "Your Location") => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: label, ...weatherResponse });
        setForecast({ city: label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      }, () => {
        setShowModal(true); // Show modal when access is denied
      });
    }
  }, []);

  
  const closeModal = () => setShowModal(false);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeather(lat, lon, searchData.label);
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Current_weather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">Location Access Denied</div>
            <p>Please allow access to your location to use this feature.</p>
            <button onClick={closeModal} className="modal-button">Close</button>
          </div>
        </div>
      )}
      <div className="footer-info">
        <a href="https://github.com/Shreya260303/WeatherApp">
          Download Source Code
        </a>{" "}
        | Developed by{" "}
          Shreya Jha
      </div>
    </div>
  );
}

export default App;
