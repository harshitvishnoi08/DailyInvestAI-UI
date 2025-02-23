import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import '../../assets/css/main.css';
import axios from 'axios';

// Fetch data first
async function fetchData(symbol) {
  try {
    const res = await axios.get(`http://localhost:5000/api/get_data?symbol=${symbol}`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
const ChartCard = ({ ChartText, symbol }) => {
  const [news, setNews] = useState(null);
  const [isFullView, setIsFullView] = useState(false); // State for full-view mode
  const [serdata, setSerdata] = useState([]);
  const [serdate, setSerdate] = useState([]);
  const newsData = [
    ['Volume got high in January.', 'Investors are excited for this year.'],
    ['Paycheck is closed for February.', 'New product launch in March.'],
    ['Revenue increased significantly in March.', 'Quarterly results were announced in April.'],
    ['New product launch in May.', 'Market share grew in June.'],
    ['Partnership deal closed in July.', 'New feature is coming out in August.']
  ];
  useEffect(() => {
    async function getData() {
      const data = await fetchData(symbol);
      console.log(data.values);
      setSerdata(data.values.map((x) => parseFloat(x).toFixed(2)));
      setSerdate(data.dates);
    }
    getData();
  }, []);
  const options = {
    chart: {
      id: 'area-chart',
      type: 'line',
      events: {
        click: (event, chartContext, config) => {
          const dataPointIndex = config.dataPointIndex;
          setNews(newsData[dataPointIndex]);
        }
      }
    },
    title: {
      text: ChartText,
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: 400,
        color: '#000'
      }
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    xaxis: {
      categories: serdate,
      labels: { show: false },
      title: { text: undefined }
    },
    yaxis: {
      labels: { show: false },
      title: { text: undefined }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { enabled: true }
  };

  const series = [
    {
      name: 'Close',
      data: serdata
    }
  ];

  // Function to toggle full-view mode
  const toggleFullView = () => {
    setTimeout(() => {
      const pages = document.querySelector('.MuiPaper-root.css-1rcxgiw-MuiPaper-root-MuiDrawer-paper');
      pages.style.display = 'none';
    }, 0);
    setIsFullView(!isFullView);
  };

  return (
    <div>
      <button
        onClick={toggleFullView}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          marginBottom: '10px',
          backgroundColor: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isFullView ? 'Exit Full View' : 'Full View'}
      </button>
      <div
        style={{
          width: isFullView ? '100vw' : '100%',
          height: isFullView ? '100vh' : 'auto',
          position: isFullView ? 'fixed' : 'static',
          top: isFullView ? '0' : 'auto',
          left: isFullView ? '0' : 'auto',
          zIndex: isFullView ? 1000 : 'auto',
          backgroundColor: isFullView ? '#fff' : 'transparent',
          padding: isFullView ? '20px' : '0',
          display: 'flex',
          flexDirection: isFullView ? 'column' : 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '100%', height: isFullView ? '70%' : '350px' }}>
          <ApexCharts options={options} series={series} type="area" height={isFullView ? '100%' : '100%'} />
        </div>
        {news && (
          <div
            style={{
              width: '100%',
              height: isFullView ? '30%' : 'auto',
              marginTop: isFullView ? '20px' : '10px',
              padding: isFullView ? '20px' : '0',
              overflowY: 'auto'
            }}
          >
            <div className="news-container">
              <div className="news-header">
                <div className="header-text">Related News</div>
              </div>
              <div className="news-content">
                <div className="news-items">
                  {news.map((item, index) => (
                    <div className="news-item" key={index}>
                      {index === 0 ? (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png"
                          width={30}
                          height={30}
                          alt="twitter"
                        />
                      ) : (
                        <img
                          src="https://static.vecteezy.com/system/resources/previews/031/737/215/non_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png"
                          width={30}
                          height={30}
                          alt="facebook"
                        />
                      )}
                      <span className="news-title">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;
