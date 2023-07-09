import React, { useState } from 'react';
import axios from 'axios';


const apk = 'f9bec4bac8df717c605a770edac2ddf5';

const SearchLocation = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      if (location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apk}`;
        axios
          .get(url)
          .then(response => {
            onSearch(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
      setLocation('');
    }
  };

  return (
    <div className="search" >
        <i className='bx bx-search'></i>
      <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={handleKeyPress} 
        placeholder="Busca una ciudad " 
        type="text"
      />
    </div>
    
  );
};

export default SearchLocation;