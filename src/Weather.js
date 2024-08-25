import React, { useState } from 'react';
import './Weather.css';

const api = {
  key: "cedea6feaaaf5305b4d56bfa59dd3d7b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then(result => {
          setWeather(result);
          setQuery("");
        })
        .catch(error => {
          console.error("There was a problem with the fetch operation:", error);
          alert("Failed to fetch weather data. Please try again later.");
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(weather && weather.main && weather.main.temp > 16) ? 'app warm' : 'app'}>
      <main>
        <div className='search-bar'>
          <input
            className='search-box'
            type='text'
            placeholder='Search...'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div >
        {weather && weather.main ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className='temperature'>
              {Math.round(weather.main.temp)}°C
            </div>
          </div>
        ) : (
          <div className='location-box'>
            <div className='location'>
              Please enter a city name to get weather information.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Weather;