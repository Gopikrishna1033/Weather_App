import React, { useState } from 'react';
import axios from 'axios'; // or use fetch
import "./weather.css"

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const currentDate = new Date()

  const months =  [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()]
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()

  const formattedDate = `${month} ${day} ${year}`

  const API_KEY = 'api_key'; // Replace with your OpenWeatherMap API key

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setWeatherData(null)
      setError('City not found');
    }
  };

  return (
    <div className='body'>
      
      <div className="weather_body">
        <div className="image">
          <img src="https://cdn-icons-png.flaticon.com/128/1146/1146869.png" alt=" weather.png" />
        </div>
        <div className="weather_details">
            {weatherData && (
            <div>
              <h3>{weatherData.name}</h3>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
            </div>
          )}

          {error && <p>{error}</p>}
        </div>        
        
        <div className="init-info">
          <h2 className='date'>{formattedDate}</h2>
          <form onSubmit={getWeather} className='form-init'>
            <input
              type="text"
              
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
            <div className="btn">
              <button type="submit">Get Weather</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
        
  );
};

export default Weather;
