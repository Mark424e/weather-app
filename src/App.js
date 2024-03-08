import React from 'react';
import Header from './Components/Header';
import WeatherApp from './Components/WeatherApp';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <WeatherApp />
        <Footer />
      </main>
    </div>
  );
}

export default App;
