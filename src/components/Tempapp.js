import React, { useEffect, useState } from 'react';
import './tempapp.css';
import bg from './bg.jpg';

function Tempapp() {
  const [city, setCity] = useState(null);
  const [searchCity, setSearchCity] = useState("");

  const handleOnChange = (e) => {
    setSearchCity(e.target.value);
  };

  const tempconv = (kelvin) => {
    let cel = kelvin - 273.15; // Convert Kelvin to Celsius
    return cel.toFixed(2); // Round to 2 decimal places
  };


  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=ab362aeceab9d3333082da4c3d6c84ac`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setCity(data);
        } else {
          console.error("City not found or API error:", data.message);
          setCity(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCity(null);
      }
    };

    if (searchCity.trim() !== "") {
      fetchApi();
    }
  }, [searchCity]);

  return (
    <>
      <div className="main-container" style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}>
        <input type="text" placeholder='Enter city name' className='city-input' onChange={handleOnChange} />

        {!city ? (
          <div className="nocity">
            <p>No City found</p>
          </div>
        ) : (
          <>
            <h2>{city.name}</h2>
            {city.main ? (
              <>
                <h3>Today's Temp: {tempconv(city.main.temp)}°C</h3>
                <p>Weather: {city.weather[0].main}</p>
                <p>Description: {city.weather[0].description}</p>
                <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}.png`} alt="Weather Icon" />
                <div className='min-max'>
                  <span>Min Temp: {tempconv(city.main.temp_min)}°C</span>
                  <span>Max Temp: {tempconv(city.main.temp_max)}°C</span>
                </div>
                <div className='min-max2'>
                  <span>Feels like: {tempconv(city.main.feels_like)}°C</span>
                  <span>Humidity: {city.main.humidity}%</span>
                </div>
              </>
            ) : (
              <p>No temperature data available</p>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Tempapp;
