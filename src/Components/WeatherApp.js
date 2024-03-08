import { useState} from 'react';
import clear_icon from "../Components/Assets/clear.png"
import cloud_icon from "../Components/Assets/cloud.png"
import drizzle_icon from "../Components/Assets/drizzle.png"
import rain_icon from "../Components/Assets/rain.png"
import snow_icon from "../Components/Assets/snow.png"
import humidity_icon from "../Components/Assets/humidity.png"
import wind_icon from "../Components/Assets/wind.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const WeatherApp = () => {

  const [wicon, setWicon] = useState(cloud_icon);
  const api_key = process.env.REACT_APP_API_KEY;

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if(element[0].value===""){
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const description = document.getElementsByClassName("weather-description");

    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " m/s";
    temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
    location[0].innerHTML = data.name;
    description[0].innerHTML = data.weather[0].description;

    if (data.weather[0].icon==="01d" || data.weather[0].icon==="01n") {
      setWicon(clear_icon);
    } else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n") {
      setWicon(cloud_icon);
    } else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n") {
      setWicon(drizzle_icon);
    } else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n") {
      setWicon(rain_icon);
    } else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n") {
      setWicon(snow_icon);
    } else {
      setWicon(snow_icon);
    }
  }

  return (
    <>
      <div className='container mx-auto h-[100vh]'>
        <div className='grid grid-cols-1 justify-center py-10 px-28 gap-8'>
          <div className='flex justify-center items-center gap-4'>
            <input className='cityInput border rounded-full px-6 py-4 focus:outline-none' placeholder='Search City...'></input>
            <button onClick={()=>{search()}}>
            <FontAwesomeIcon className='bg-white p-4 text-gray-300 font-bold rounded-full text-[24px] transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-300 hover:text-white' icon={faSearch} /></button>
          </div>
          <div className='flex flex-col justify-between text-white font-bold gap-8'>
            <div className='flex flex-col justify-center'>
              <div className='weather-image'>
                <img className='mx-auto' src={wicon} alt="" />
              </div>
              <div className='text-center'>
                <div className='weather-temp text-7xl'>Undefined</div>
                <div className='weather-description capitalize font-normal leading-10'>Undefined</div>
                <div className='weather-location text-4xl font-normal'>Undefined</div>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='flex items-start gap-4'>
                <img className='w-6 h-6' src={humidity_icon} alt='Humidity Icon'/>
                <div className='flex flex-col items-start font-normal'>
                  <p className='humidity-percent text-2xl leading-none'>Undefined</p>
                  <p className='text-sm'>Humidity</p>
                </div>
              </div>
              <div className='flex items-start gap-4'>
                <img className='w-6 h-6' src={wind_icon} alt='Wind Icon'/>
                <div className='flex flex-col items-start font-normal'>
                  <p className='wind-rate text-2xl leading-none'>Undefined</p>
                  <p className='text-sm'>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
