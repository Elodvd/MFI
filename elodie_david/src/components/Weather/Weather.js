import axios from "axios";
import "./chart.css";
import React, { useState } from "react";

const Weather =(lat, lon)=> {
  const [weather, setWeather] = useState({});

  const apiCall = async () => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=539a92a71fbb1b6ee46f8afdfc95bb2e`;
    const response = await axios.get(url);
    const data = response.data;
    setWeather({
      temp: [
        data.daily[0].temp.day,
        data.daily[1].temp.day,
        data.daily[2].temp.day,
      ],
      humidity: [
        data.daily[0].humidity,
        data.daily[1].humidity,
        data.daily[2].humidity,
      ],
    });
  };

  let test = apiCall(43.2,1.5); 
  console.log(test);




  return (
    <div className="chartContainer">
       <div>
        <p>Température jour 1 : {weather.temp[0]}</p>
        <p>Température jour 2 : {weather.temp[1]}</p>
        <p>Température jour 3 : {weather.temp[2]}</p>

        <p>Taux humidité jour 1 : {weather.humidity[0]}%</p>
        <p>Taux humidité jour 2 : {weather.humidity[1]}%</p>
        <p>Taux humidité jour 3 : {weather.humidity[2]}%</p>
      </div>
    </div>
  );
};

export default Weather;
