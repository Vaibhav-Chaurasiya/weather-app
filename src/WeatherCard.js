import React from "react";
import moment from "moment";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="text-white text-center">
      <h2 className="text-2xl font-bold mb-1">
        {weatherData.name}, {weatherData.sys.country}
      </h2>
      <p className="mb-2">{moment().format("dddd, MMMM Do YYYY, h:mm A")}</p>
      <p className="capitalize mb-2">{weatherData.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        className="mx-auto mb-4"
      />
      <p className="text-4xl font-bold mb-4">{Math.round(weatherData.main.temp)}°C</p>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="bg-white bg-opacity-20 rounded-xl p-3">
          <p className="font-bold">{weatherData.main.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-xl p-3">
          <p className="font-bold">{weatherData.wind.speed} m/s</p>
          <p>Wind</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-xl p-3">
          <p className="font-bold">{weatherData.main.pressure} hPa</p>
          <p>Pressure</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;