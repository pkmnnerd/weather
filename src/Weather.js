import React from 'react';


const getDescription = (weatherCode) => {
  if (weatherCode >= 50 && weatherCode < 70) {
    return "Rainy"
  }
  if (weatherCode >= 70 && weatherCode < 80) {
    return "Snowy"
  }
  return "Clear"
}

const getIcon = (description, hour) => {
  if (description === 'Rainy') {
    return "rainy"
  } else if (description === 'Snowy') {
    return "snowy"
  } else if (hour > 5 && hour < 7) {
    return "sun"
  }
  return "night"
}

export default function Weather(props) {
  const { weatherCode, hour } = props;
  const description = getDescription(weatherCode);
  const icon = getIcon(description, hour);

  return (
    <div id="weather" style={{display: 'flex', alignItems: 'center'}}>
      <img src={`/weather/${icon}.png`} />
      <h1 style={{paddingLeft: '1rem'}}>
        {description}
      </h1>
    </div>

  )

}