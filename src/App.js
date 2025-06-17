import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import moment from "moment";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "f237aa1fe2e1a2c8d6b55b5e86d19ce6"; 

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found!");
      setWeatherData(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center justify-center">
          🌤️ Weather App
        </h1>
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-700 text-white px-4 py-2 rounded-r-lg"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
};

export default App;