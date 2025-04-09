// import React from 'react'

// const Weather = ({ className }) => {
//   return (
//     <div className={className}>Weather</div>
//   )
// }

// export default Weather

import React, { useEffect, useState } from 'react';
import { getWeather } from '../api/weatherApi';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getWeather('New York');
      setWeather(data);
    }

    fetchData();
  }, []);

  return (
    <div className="widget">
      <h2>Weather</h2>
      {weather ? (
        <>
          <p>{weather.location.name}</p>
          <p>{weather.current.temp_c}°C</p>
          <p>{weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="icon" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherWidget;
