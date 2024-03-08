import React from 'react';
import Header from './Components/Header';
import WeatherApp from './Components/WeatherApp';
import TopCitiesWeather from './Components/TopCitiesWeather';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <WeatherApp />
        <TopCitiesWeather />
        <Footer />
      </main>
    </div>
  );
}

export default App;
