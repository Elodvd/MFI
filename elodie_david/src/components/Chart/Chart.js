import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const Chart = ({ title, chartTempOptions, chartHumOptions }) => {
  const Options = {
    title: {
      text: title,
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
      layout: "vertical",
      align: "left",
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
          format: "{y}%",
        },
        enableMouseTracking: true,
      },
    },

    series: [
      {
        type: "column",
        name: "Temperature",
        yAxis: 1,
        data: chartTempOptions,
        tooltip: {
          valueSuffix: " °C",
        },
      },
      {
        type: "line",
        name: "Humidity",
        data: chartHumOptions,
        tooltip: {
          valueSuffix: " %",
        },
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
