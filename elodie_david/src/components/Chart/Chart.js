//import { apiCall } from "../../../utils/API";
import "./chart.css";
import React, { useState, useEffect } from "react";

const Chart = ({city}) => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=539a92a71fbb1b6ee46f8afdfc95bb2e`;

  return (
    <div className="chartContainer">
      <div className="chart"></div>
      <div className="chartinfo">
        <p>temp1</p>
        <p>temp2</p>
        <p>temp3</p>
        <p>hum1</p>
        <p>hum2</p>
        <p>hum3</p>
      </div>
    </div>
  );
};

export default Chart;
/*
<div>
        <p>Température jour 1 : {weather.temp[0]}</p>
        <p>Température jour 2 : {weather.temp[1]}</p>
        <p>Température jour 3 : {weather.temp[2]}</p>

        <p>Taux humidité jour 1 : {weather.humidity[0]}%</p>
        <p>Taux humidité jour 2 : {weather.humidity[1]}%</p>
        <p>Taux humidité jour 3 : {weather.humidity[2]}%</p>
      </div>

    */