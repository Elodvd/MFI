import React, { useState } from "react";
//import { playgrounds } from "../data/data";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./chart.css"


const Chart = ({chartOptions}) => {
  /*
  const ToggleChart = () => {
    setChartOptions([
      [5],
      [20],
      [20]
    ]);
  };

  const [chartOptions, setChartOptions] = useState([
    [10],
    [70],
    [50]
  ]);
  */

  const Options = {
    chart: {
      type: "column",
    },
    title: {
      text: 'Last three days Temperature and Humidity %',
    },
    xAxis: {
      categories: [
        "D-2",
        "D-1",
        "DDay"
      ],
    },
    yAxis: {
      title: {
        text: "Temperature",
      },
    },
    legend: {
      enabled:false,
      title:"test"
    },
    series: [
      {
      
        data: chartOptions,
      },
    ],
  };

  return (
    <div className="chartContainer">
      <HighchartsReact highcharts={Highcharts} options={Options} />
    </div>
  );
};

export default Chart;



