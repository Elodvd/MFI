import React, { useState } from "react";
//import { playgrounds } from "../data/data";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./chart.css"


const Chart = ({chartOptions}) => {

  const Options = {
    chart: {
      type: "line",
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
      enabled:true,
      title:"test"
    },
    plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          },
          enableMouseTracking: false
      }
  },
         
    series: [
      {
      
        data: chartOptions
      },
    ],
    annotations: [ {
      draggable: '',
      labels: [{
          point: {
              xAxis: 0,
              yAxis: 0,
              x: 101.44,
              y: 1026
          },
          x: -30,
          text: 'Col de la Joux'
      }, {
          point: {
              xAxis: 0,
              yAxis: 0,
              x: 138.5,
              y: 748
          },
          text: 'Côte de Viry'
      }, {
          point: {
              xAxis: 0,
              yAxis: 0,
              x: 176.4,
              y: 1202
          },
          text: 'Montée de la Combe <br>de Laisia Les Molunes'
      }
    ]
    }]
      
  
  };



  return (
    <div className="chartContainer">
      <HighchartsReact highcharts={Highcharts} options={Options} />
    </div>
  );
};

export default Chart;



