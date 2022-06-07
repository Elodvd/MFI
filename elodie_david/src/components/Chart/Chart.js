import React, { useState } from "react";
//import { playgrounds } from "../data/data";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./chart.css";




  const Chart = ({ chartTempOptions, chartHumOptions }) => {
    const Options = {  
      immutable : true ,
      title: {
        text: "Last three days Temperature and Humidity %",
      },
      xAxis: {
        categories: ["D-2", "D-1", "DDay", "D+1", "D+2"],
        crosshair: true,
      },
      yAxis: [
        {
          labels: {
       
            format: "{value}°C",
          },
          title: {
            text: "Temperature",
          },
        },
        {
          labels: {
        
            format: "{value}%",
          },
          title: {
            text: "Humidity",
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },
      legend: {
        layout: 'vertical',
        align: 'left',
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false,
        },
      },
  
      series: [
        {
          type:'column',
          name: "Temperature",
          zindex:1,
          yAxis: 1,
          data: chartTempOptions,
          tooltip: {
            valueSuffix: " °C"
          },
        },
        {
          type:'line',
          name: "Humidity",
          data: chartHumOptions,
          tooltip: {
            valueSuffix: " %"
          },
        },
      ],
      annotations: [{
        labels: [{
            point: 'test',
            text: 'test'
        }, {
            point: 'min',
            text: 'Min',
            backgroundColor: 'white'
        }]
    }]
    };
  
    return (
      <div className="chartContainer">
        <HighchartsReact highcharts={Highcharts} options={Options} />
      </div>
    );
  };
  
  export default Chart;