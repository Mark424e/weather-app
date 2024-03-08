import React, { useState, useEffect } from 'react';
import clear_icon from "../Components/Assets/clear.png"
import cloud_icon from "../Components/Assets/cloud.png"
import drizzle_icon from "../Components/Assets/drizzle.png"
import rain_icon from "../Components/Assets/rain.png"
import snow_icon from "../Components/Assets/snow.png"
import humidity_icon from "../Components/Assets/humidity.png"
import wind_icon from "../Components/Assets/wind.png"

const TopCitiesWeather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Moscow'];

    const fetchWeatherDataForCities = async () => {
      try {
        const promises = cities.map(async (city) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          const data = await response.json();
          return data;
        });

        const weatherDataList = await Promise.all(promises);
        setWeatherData(weatherDataList);
        setError(null);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
        setError('Failed to fetch weather data');
      }
    };

    fetchWeatherDataForCities();
  }, []);

  // Helper function to get weather icon based on weather condition
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return clear_icon;
      case "02d":
      case "02n":
        return cloud_icon;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return drizzle_icon;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return rain_icon;
      case "13d":
      case "13n":
      default:
        return snow_icon;
    }
  };

  return (
    <div className="container mx-auto my-10 hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-items-cente text-textColor gap-6 cursor-default">
      {weatherData.map((cityData, index) => (
        <div key={index} className="city-weather bg-primary/25  flex flex-col justify-center items-center gap-4 p-4 rounded shadowshadow-lg transform duration-300 ease-in-out hover:scale-105 hover:bg-primary/50">
          <h2 className='font-bold'>{cityData.name}</h2>
          <img className='w-20' src={getWeatherIcon(cityData.weather[0].icon)} alt="Weather Icon" />
          <p className='text-4xl'>{Math.round(cityData.main.temp)} °C</p>
          <p className='text-sm'>{cityData.weather[0].description}</p>
          <div className='grid gap-4'>
            <div className='flex gap-4'>
              <img className='w-6 h-6' src={humidity_icon} alt='Humidity Icon' />
              <p>{cityData.main.humidity} %</p>
            </div>
            <div className='flex gap-4'>
              <img className='w-6 h-6' src={wind_icon} alt='Wind Icon' />
              <p>{Math.round(cityData.wind.speed)} m/s</p>
            </div>
          </div>
        </div>
      ))}
      {error && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};

export default TopCitiesWeather;