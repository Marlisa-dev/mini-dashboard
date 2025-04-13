import React, { useEffect, useState } from 'react';
import { getWeather } from '../api/weatherApi';
import { Link } from 'react-router-dom';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Dallas');
  const [days, setDays] = useState(3);
  const [alerts, setAlerts] = useState('no');
  const [inputValue, setInputValue] = useState(''); 

  const fetchData = async (selectedCity) => {
    const data = await getWeather(selectedCity);
    setWeather(data);
  }

  useEffect(() => {
    fetchData(city);
  }, []);

  return (
    <div className="widget">
      {/* <h2>Weather & Forecast</h2> */}

      {weather ? (
        <>
          {/* ✅ Current Weather Section */}
          <div className="current-weather">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{marginBottom: '5px', textAlign: 'center'}}>Today's Weather</h3>
              <div>
                <input 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter city"
                  style={{padding: '3px', marginRight: '5px', outline: 'none'}}></input>
                <button 
                  style={{padding: '4px 8px', border: 'none', backgroundColor: '#26c98e', color: 'white', fontWeight: 'bold', borderRadius: '3px'}}
                  onClick={() => {
                    if (!inputValue.trim()) return; // ignore empty input
                    setCity(inputValue);           // update the city to fetch
                    fetchData(inputValue);         // fetch new data
                    setInputValue('');             // clear input
                  }}
                  >GO</button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <p><strong>Location:</strong> {weather.location.name}</p>
                <p><strong>Temperature:</strong> {weather.current.temp_f}°F</p>
                <p><strong>Condition:</strong> {weather.current.condition.text}</p>
              </div>
              <img src={weather.current.condition.icon} alt="icon" />


              {/* TODO: Add alerts for bad city call, bad weather alerts and keydown search */}

              {/* <div style={{backgroundColor: 'var(--card-bg)', padding: '5px'}}>
                <p><strong>No Bad Weather Alerts</strong></p>
              </div> */}

              </div>
            </div>
            

          {/* ✅ 3-Day Forecast Section */}
          <div className="forecast-weather">
            <h3 style={{marginBottom: '5px', textAlign: 'center'}}>3-Day Forecast</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
              {weather.forecast.forecastday.slice(1).map((day) => {
                const date = new Date(day.date);
                console.log(date)
                const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
                console.log(weekday)
                return (
                  <div
                    key={day.date}
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      padding: '1rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    <h4>{weekday}</h4>
                    <p>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <img src={day.day.condition.icon} alt="icon" />
                    <p><strong>Low:</strong> {day.day.mintemp_f}°F</p>
                    <p><strong>High:</strong>  {day.day.maxtemp_f}°F</p>
                    <p>{day.day.condition.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherWidget;
