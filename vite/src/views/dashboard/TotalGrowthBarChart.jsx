import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';

const status = [
  { value: 'today', label: 'Today' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' }
];

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const [news, setNews] = useState(null);
  const [isFullView, setIsFullView] = useState(false); // State for full-view mode
  const theme = useTheme();

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  useEffect(() => {
    const newsData = [
      ['Volume got high in January.', 'Investors are excited for this year.'],
      ['Paycheck is closed for February.', 'New product launch in March.'],
      ['Revenue increased significantly in March.', 'Quarterly results were announced in April.'],
      ['New product launch in May.', 'Market share grew in June.'],
      ['Partnership deal closed in July.', 'New feature is coming out in August.']
    ];

    const options = {
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
      stroke: { curve: 'straight', width: 1 },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] },
      yaxis: { labels: { show: false } },
      tooltip: { enabled: true },
      dataLabels: {
        enabled: false
      },
      marker: {
        show: false
      }
    };

    const series = [{ name: 'Sales', data: [60, 65, 50, 55, 45, 50, 49, 55] }];

    if (!isLoading) {
      ApexCharts.exec('bar-chart', 'updateOptions', { ...options, series });
    }
  }, [primary200, primaryDark, secondaryMain, secondaryLight, isLoading]);

  // Function to toggle full-view mode
  const toggleFullView = () => {
    setIsFullView(!isFullView);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Total Growth</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">$0</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={toggleFullView} style={{ marginBottom: '10px' }}>
                {isFullView ? 'Exit Full View' : 'Full View'}
              </Button>
              <div
                style={{
                  width: isFullView ? '100vw' : '100%',
                  height: isFullView ? '100vh' : '400px',
                  position: isFullView ? 'fixed' : 'static',
                  top: isFullView ? '0' : 'auto',
                  left: isFullView ? '0' : 'auto',
                  zIndex: isFullView ? 1000 : 'auto',
                  backgroundColor: isFullView ? '#fff' : 'transparent',
                  padding: isFullView ? '20px' : '0'
                }}
              >
                <Chart
                  options={{
                    chart: { type: 'line' },
                    events: {
                      click: (event, chartContext, config) => {
                        const dataPointIndex = config.dataPointIndex;
                        setNews(newsData[dataPointIndex]);
                      }
                    },
                    dataLabels: { enabled: false }
                  }}
                  series={chartData.series}
                  type="area"
                  height={isFullView ? '90%' : '100%'}
                />
              </div>
            </Grid>
          </Grid>
          {news && (
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
          )}
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
