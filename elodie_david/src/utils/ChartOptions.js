export const TempSeries = {
  type: "column",
  name: "Temperature",
  data: [],
  tooltip: {
    valueSuffix: " °C",
  },
};
export const HumSeries = {
  type: "line",
  name: "Humidity",
  yAxis: 1,
  data: [],
  tooltip: {
    valueSuffix: " %",
  },
};

export const ChartOptions = {
  title: {
    text: "",
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

  series: [TempSeries, HumSeries],
};
