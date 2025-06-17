import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [time, setTime] = useState(moment().format('LTS'));

  const apiKey = 'f237aa1fe2e1a2c8d6b55b5e86d19ce6';

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format('LTS'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      fetchData(url);
    });
  }, []);

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data.city);
      setForecast(data.list);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    fetchData(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">🌤 Pro Weather App</h1>
      <p className="text-white mb-5">{time}</p>

      <div className="flex w-full max-w-md mb-5">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow p-3 rounded-l-lg text-lg"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-3 bg-yellow-400 text-black rounded-r-lg font-bold hover:bg-yellow-300 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-300">{error}</p>}

      {weather && (
        <div className="bg-white bg-opacity-20 p-6 rounded-2xl shadow-lg text-white w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-3">{weather.name}, {weather.country}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {forecast.slice(0, 8).map((item, index) => (
              <div key={index} className="bg-white bg-opacity-20 p-3 rounded-xl shadow text-center">
                <p className="font-semibold mb-1">{moment(item.dt_txt).format('ddd, hA')}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt={item.weather[0].description}
                  className="mx-auto w-16 h-16"
                />
                <p className="text-lg font-bold">{item.main.temp}°C</p>
                <p className="capitalize text-sm">{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
