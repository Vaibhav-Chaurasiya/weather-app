import React from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="bg-white bg-opacity-50 p-6 rounded-xl shadow-md text-center">
      <h2 className="text-3xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
      <p className="text-lg mt-2">{weatherData.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        className="mx-auto"
      />
      <p className="text-2xl font-semibold">{Math.round(weatherData.main.temp)}°C</p>
    </div>
  );
};

export default WeatherCard;
