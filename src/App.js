import React, { useEffect, useState } from 'react';
import Snowflakes from 'magic-snowflakes';
import makeItRain from 'make-it-rain-js';


import Video from './Video';
import Weather from './Weather';

import './App.css';



const snowflakes = new Snowflakes({
  color: '#f0f0ff',
  zIndex: 1,
});
const raindrops = makeItRain()

const BACKGROUNDS = {
  winter: 'https://dodo.ac/np/images/5/5e/MainPageGrass-Winter.png',
  summer: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da443644-2b2a-4a35-ac70-c28f4e5d86e4/d79w7f1-356776f7-78e4-482c-8790-bd84d06c7717.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhNDQzNjQ0LTJiMmEtNGEzNS1hYzcwLWMyOGY0ZTVkODZlNFwvZDc5dzdmMS0zNTY3NzZmNy03OGU0LTQ4MmMtODc5MC1iZDg0ZDA2Yzc3MTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.viTVcLVJLMPuzvv5x1ak1hYwM0aWKiQY4IUOu5wfWF4',
  autumn: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/77bf3ba9-0aac-4452-be82-de536b5aab32/dezrr5x-64fc57bd-8b36-4573-a155-fbea5bb4ac06.png/v1/fill/w_1280,h_1280,strp/animal_crossing_grass_fall_triangle_pattern_by_biochao_dezrr5x-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzc3YmYzYmE5LTBhYWMtNDQ1Mi1iZTgyLWRlNTM2YjVhYWIzMlwvZGV6cnI1eC02NGZjNTdiZC04YjM2LTQ1NzMtYTE1NS1mYmVhNWJiNGFjMDYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.yfOE-OKkqBc9M2v4sGkRXYM_bivX6zFwqywMkIVFvQs',
}

function App() {
  const [location, setLocation] = useState([0, 0]);
  const [weather, setWeather] = useState(null);
  const [hasWeather, setHasWeather] = useState(false);
  const [game, setGame] = useState('cityfolk');
  const [hour, setHour] = useState('2');
  const [background, setBackground] = useState(null);

  useEffect(() => {
    const date = new Date()
    setHour(date.getHours().toString())
    const month = date.getMonth();
    const day = date.getDate();
    if ((month === 11 && day >= 10) || (month === 0 && day < 24 )) {
      setBackground('winter');
    } else if (month > 7) {
      setBackground('autumn');
    }

    fetch('http://ip-api.com/json/')
      .then((res) => res.json())
      .then((data) => {
        setLocation([data.lat, data.lon]);
      })
  }, [])

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location[0]}&longitude=${location[1]}&hourly=temperature_2m,weathercode&current_weather=true`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setHasWeather(true);
      })
  }, [location])


  useEffect(() => {
    const date = new Date()
    setHour(date.getHours().toString())
    const secondsLeft = 3600 - date.getMinutes() * 60 - date.getSeconds() + 5;
    setTimeout(() => {
      const newHour = new Date().getHours()
      setHour(newHour.toString())
    }, secondsLeft * 1000)
  }, [hour, setHour])


  let weatherMusic = 'clear';
  const code = weather && weather.current_weather.weathercode;
  if (weather && ((code >= 50 && code < 70) || code >= 80)) {
    weatherMusic = 'rain';
  }
  if (weather && (code >= 70 && code < 80)) {
    weatherMusic = 'snow';
  }

  useEffect(() => {
    if (weatherMusic === 'snow') {
      snowflakes.start();
    } else {
      snowflakes.stop();
      snowflakes.destroy();
    }
    if (weatherMusic === 'rain') {
      raindrops.startAnimation();
    } else {
      raindrops.stopAnimation();
    }
  }, [weatherMusic])

  return (
    <div className="App">
      <header className="App-header">
        <h1>AC Weather</h1>
      </header>
      <main style={{ backgroundImage: `url(${BACKGROUNDS[background]})` }}>
        <div id="weather-box">
          {weather && 
            <Weather weatherCode={weather.current_weather.weathercode} hour={hour}/>
          }
        </div>
        <div id="player">
          { hasWeather && <Video hour={hour} weather={weatherMusic} game={game} />}
        </div>
        <div className="container">
          <div className="btn-group" role="group" style={{ display: 'none' }}>
            <button type="button" className="btn btn-success" onClick={() => setGame('cityfolk')}>
              Wild World/City Folk
            </button>
            <button type="button" className="btn btn-success" onClick={() => setGame('newleaf')}>
              New Leaf
            </button>
            <button type="button" className="btn btn-success" onClick={() => setGame('newhorizons')}>
              New Horizons
            </button>
          </div>
          <div className="divider" />
          <div>
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-success" onClick={() => setBackground('summer')}>
                Spring/Summer
              </button>
              <button type="button" className="btn btn-success" onClick={() => setBackground('autumn')}>
                Fall
              </button>
              <button type="button" className="btn btn-success" onClick={() => setBackground('winter')}>
                Winter
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer>
        Weather data from <a href="https://open-meteo.com/en" target="_blank" rel="noopener noreferrer">Open-Meteo</a>.
        {' '}
        Weather icons create by <a href="https://www.flaticon.com/packs/weather-161" title="star icons">iconixar - Flaticon</a>.
        Not affiliated with Nintendo. All rights belong to their respective owners.
      </footer>
    </div>
  );
}

export default App;
