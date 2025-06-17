import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';

const API_KEY = "f237aa1fe2e1a2c8d6b55b5e86d19ce6";  // <-- Yaha apna OpenWeatherMap API key dalna!

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col p-4">
      <h1 className="text-4xl font-bold mb-8 text-white">🌦 Pro Weather App</h1>
      
      <div className="flex space-x-2 mb-8">
        <input
          type="text"
          placeholder="Enter city name"
          className="p-3 rounded-xl border focus:outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      <WeatherCard weatherData={weatherData} />
    </div>
  );
}

export default App;
