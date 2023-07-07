import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './change.css';
import SearchLocation from './components/searchLocation';


const API_KEY = 'f9bec4bac8df717c605a770edac2ddf5';

const App = () => {
  const [data, setData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [unit, setUnit] = useState('C');
  const [isNightMode, setIsNightMode] = useState(false);

  const handleSearch = searchData => {
    setData(searchData);
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertTemperature = temp => {
    if (unit === 'F') {
      return ((temp - 273.15) * 1.8 + 32).toFixed(0);
    }
    return (temp - 273.15).toFixed(0);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        axios
          .get(url)
          .then(response => {
            setData(response.data);
            const { icon } = response.data.weather[0];
            setWeatherIcon(icon);
          })
          .catch(error => {
            console.error(error);
          });
      },
      error => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    if (isNightMode) {
      document.body.style.backgroundImage = 'radial-gradient(#53388F 0%, #2F2958 100%)'; 
      document.getElementById('div1').style.backgroundImage = 'radial-gradient(#5836B3 0%, #5936B4 0.01%, #362A84 100%)';
    } else {
      document.body.style.backgroundImage = 'radial-gradient(#D5F3FF 0%, #51B4E8 100%)';
      document.getElementById('div1').style.backgroundImage = 'radial-gradient(#E5F2FF 0%, #D5F3FF 97.4%)';
    }
  }, [isNightMode]);

  return (
    <>
      <div className={`container ${isNightMode ? 'night-mode' : ''}`}>
      
        <div className="row-1">
        
          <div className="app-w" style={{ color: isNightMode ? 'blue' : 'white' }}>
          <div className='wet'>Weather app</div>
          </div>
          <div >
          <SearchLocation onSearch={handleSearch}  />
          </div>
          
          <label className="switch">
          <input type="checkbox" onClick={toggleNightMode}/>
          <span className="slider round"></span>
          </label>
        </div>
      </div>
   
      <div id="wrapper">
        <div id="div1"></div>
        <div id="div2">{data.weather ? <p>{data.weather[0].main}</p> : null}</div>

        <div id="div3" >
          {weatherIcon && (
        <div>
          <img src={`${weatherIcon}.png`} alt="Weather Icon" className="weather-icon" /></div>)}</div>

        <div id="div4">
          <div id="grade">{data.main ? <h1>{convertTemperature(data.main.temp)}°{unit}</h1> : null}</div>
        </div>

        <div id="div5">
          <div>Humedad:  {data.main ? `${data.main.humidity}%` : null}</div>
          <div>Viento:   {data.wind ? `${data.wind.speed} MPH` : null}</div>
          <div>Presión:  {data.main ? `${data.main.pressure} hPa` : null}</div>
          <div id="state">{data.name}, {data.sys?.country}</div>
        </div>
      </div>

      <div className="row-2">
       
          <button className="unit-toggle" onClick={toggleUnit}>
            Cambiar a {unit === 'C' ? 'F°' : 'C°'}
          </button>
       
      </div>
    </>
  );
};

export default App;