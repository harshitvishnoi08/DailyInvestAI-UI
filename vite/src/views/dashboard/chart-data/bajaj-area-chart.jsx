// ==============================|| DASHBOARD - BAJAJ AREA CHART ||============================== //

const chartData = {
  type: 'area',
  height: 95,
  options: {
    chart: {
      id: 'bar-chart',
      type: 'line',
      events: {
        click: (event, chartContext, config) => {
          const dataPointIndex = config.dataPointIndex;
          if (dataPointIndex >= 0) setNews(newsData[dataPointIndex]);
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Ticket '
        }
      },
      marker: {
        show: false
      }
    }
  },
  series: [
    {
      data: [0, 15, 10, 50, 30, 40, 25]
    }
  ]
};

export default chartData;
