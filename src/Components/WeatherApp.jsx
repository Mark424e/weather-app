import React from 'react';

const WeatherApp = () => {

  const api_key = "5a6eb5367e972d98c0ddc9ea2a2972b8";

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if(element[0].value==="")
    {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = data.main.humidity;
    wind[0].innerHTML = data.wind.speed;
    temperature[0].innerHTML = data.main.temp;
    location[0].innerHTML = data.name;
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center'>
          <div>
            <input className='cityInput border rounded px-4 py-2 mr-2' placeholder='Search City...'></input>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>{search()}}>Search</button>
          </div>
          <div className='humidity-percent'>Test</div>
          <div className='wind-rate'>Test</div>
          <div className='weather-temp'>Test</div>
          <div className='weather-location'>Test</div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
