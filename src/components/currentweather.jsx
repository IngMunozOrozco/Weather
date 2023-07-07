/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'f9bec4bac8df717c605a770edac2ddf5';

const App = () => {
  const [temperature, setTemperature] = useState(null);
  const [unit, setUnit] = useState('C');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        axios
          .get(url)
          .then(response => {
            const { temp } = response.data.main;
            setTemperature(temp);
          })
          .catch(error => {
            console.error(error);
          });
      },
    );
  }, []);

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertTemperature = temp => {
    if (unit === 'F') {
      return ((temp - 273.15) * 1.8 + 32).toFixed(0);
    }
    return (temp - 273.15).toFixed(0);
  };

  return (
    <div className="app">
     
      <h1>Temperatura</h1>
      <div className="temperature-container">
        {temperature && (
          <>
            <p className="temperature">
              {convertTemperature(temperature)}
              <span className="unit" onClick={toggleUnit}>
                {unit}
              </span>
            </p>
            <button onClick={toggleUnit}>
              Cambiar {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App; */