import { useState, useEffect } from 'react';
import clear_icon from "../Components/Assets/clear.png"
import cloud_icon from "../Components/Assets/cloud.png"
import drizzle_icon from "../Components/Assets/drizzle.png"
import rain_icon from "../Components/Assets/rain.png"
import snow_icon from "../Components/Assets/snow.png"
import humidity_icon from "../Components/Assets/humidity.png"
import wind_icon from "../Components/Assets/wind.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const WeatherApp = () => {

  const [wicon, setWicon] = useState(cloud_icon);
  const [defaultCity, setDefaultCity] = useState("Copenhagen");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [daytime, setDaytime] = useState(true); // Default to daytime

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;

    const fetchWeatherData = async (city) => {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
      try {
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error('Invalid Location');
        }
        let data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
        setError('Invalid location');
      }
    };

    const fetchForecastData = async (city) => {
      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}`;
      try {
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error('Invalid Location');
        }
        let data = await response.json();
        setForecastData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching forecast data:', error.message);
        setError('Invalid location');
      }
    };
  
    fetchWeatherData(defaultCity);
    fetchForecastData(defaultCity);
  }, [defaultCity]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if (element[0].value === "") {
      return 0;
    }
    setDefaultCity(element[0].value);
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return clear_icon;
      case "Clouds":
        return cloud_icon;
      case "Rain":
        return rain_icon;
      case "Snow":
        return snow_icon;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (weatherData) {
      const { main, wind, name, weather } = weatherData;
      const humidity = document.getElementsByClassName("humidity-percent");
      const windRate = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
      const description = document.getElementsByClassName("weather-description");

      const { sys } = weatherData;
      const currentTime = new Date().getTime() / 1000; // Convert to seconds
      const sunrise = sys.sunrise;
      const sunset = sys.sunset;

      if (currentTime > sunrise && currentTime < sunset) {
        setDaytime(true); // It's daytime
      } else {
        setDaytime(false); // It's nighttime
      }

      humidity[0].innerHTML = main.humidity + "%";
      windRate[0].innerHTML = Math.floor(wind.speed) + " m/s";
      temperature[0].innerHTML = Math.floor(main.temp) + " °C";
      location[0].innerHTML = name;
      description[0].innerHTML = weather[0].description;

      switch (weather[0].icon) {
        case "01d":
        case "01n":
          setWicon(clear_icon);
          break;
        case "02d":
        case "02n":
          setWicon(cloud_icon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWicon(drizzle_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
          setWicon(rain_icon);
          break;
        case "13d":
        case "13n":
        default:
          setWicon(snow_icon);
          break;
      }
    }
  }, [weatherData]);

  return (
    <>
      <div className='container mx-auto text-textColor'>
          <div className='flex justify-center my-10'>
            <div className='flex items-center gap-4 relative'>
              <input className='cityInput bg-backgroundColor text-textColor border rounded-full px-6 py-4 outline-none' onKeyPress={handleKeyPress} placeholder='Search Location...'></input>
              <button className='absolute right-0 me-2 text-textColor font-bold rounded-full text-[16px] leading-none transform duration-300 ease-in-out hover:scale-150 hover:animate-pulse' onClick={() => { search() }}>
                <FontAwesomeIcon className='p-4' icon={faSearch} />
              </button>
            </div>
          </div>
          {error && (
          <div className="text-red-500 font-bold text-center">{error}</div>
          )}
          <div className='grid grid-cols-1 md:grid-cols-3 justify-center gap-8 my-10'>
          <div className={`bg-primary/25 rounded flex flex-col md:col-span-2 justify-between font-bold gap-20 cursor-default ${daytime ? 'day' : 'night'}`}>
            <div className='h-full flex flex-col gap-10 justify-between  p-4'>
              <div className='flex flex-col justify-center'>
                <div className='weather-image'>
                  <img className='mx-auto' src={wicon} alt="" />
                </div>
                <div className='text-center'>
                  <div className='weather-temp text-7xl'></div>
                  <div className='weather-description capitalize font-normal leading-10'></div>
                  <div className='weather-location text-4xl font-normal'></div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-start gap-4'>
                  <img className='w-6 h-6' src={humidity_icon} alt='Humidity Icon' />
                  <div className='flex flex-col items-start font-normal'>
                    <p className='humidity-percent text-2xl leading-none'></p>
                    <p className='text-sm'>Humidity</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <img className='w-6 h-6' src={wind_icon} alt='Wind Icon' />
                  <div className='flex flex-col items-start font-normal'>
                    <p className='wind-rate text-2xl leading-none'></p>
                    <p className='text-sm'>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {forecastData && (
          <div className="forecast-section grid gap-4 bg-primary/25 filter backdrop-blur p-4 rounded text-textColor cursor-default">
            <div className='flex items-center gap-2 text-sm'>
              <FontAwesomeIcon icon={faCalendarAlt} />
              <h2>5-Day Forecast For {forecastData.city.name}</h2>
            </div>
              {forecastData.list.reduce((uniqueDays, forecast) => {
                const dateString = forecast.dt_txt.split(' ')[0];
                const date = new Date(dateString);
                let dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

                if (date.toDateString() === new Date().toDateString()) {
                  dayOfWeek = "Today";
                } else {
                  dayOfWeek = dayOfWeek.slice(0, 1).toUpperCase() + dayOfWeek.slice(1, 3).toLowerCase();
                }

                if (!uniqueDays.some(item => item.dayOfWeek === dayOfWeek)) {
                  uniqueDays.push({ dayOfWeek, forecast }); // Store the day of the week and its corresponding forecast
                }
                return uniqueDays;
              }, []).map(({ dayOfWeek, forecast }, index) => (
                <>
                  <hr/>
                  <div key={index} className="forecast-item">
                    <div className='flex justify-between items-center'>
                      <div>
                        <div>{dayOfWeek}</div>
                        <div>{Math.round(forecast.main.temp)} °C</div>
                      </div>
                      <div>
                        <img className='w-20' src={getWeatherIcon(forecast.weather[0].main)} alt="Weather Icon" />
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
