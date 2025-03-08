import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// material-ui
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import ChartCard from './ChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import axios from 'axios';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
  const [stocksData, setStocksData] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [graph, setGraph] = useState(0);
  const stocks = [
    { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv' },
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd' },
    { symbol: 'ZOMATO.NS', name: 'Zomato' },
    { symbol: 'ADANIENT.NS', name: 'Adani Enterprises Ltd' },
    { symbol: 'TATAMOTORS.NS', name: 'Tata Motors Ltd' }
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        const responses = await Promise.all(
          stocks.map((stock) => axios.get(`http://localhost:5000/api/current_price?symbol=${stock.symbol}`))
        );
        const data = responses.map((response, index) => ({
          ...stocks[index],
          price: response.data.current_price,
          pnl: response.data.percentage_change
        }));
        setStocksData(data);
      } catch (error) {
        console.error('Error fetching stocks data:', error);
      }
    };

    fetchStocksData();
    console.log(stocks[graph].name);
  }, [graph]);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Popular Stocks</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: 'primary.200',
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={72} sx={{ pt: '6px !important' }}>
                <ChartCard key={graph} ChartText={stocks[graph].name} symbol={stocks[graph].symbol} />
              </Grid>
              <Grid item xs={12}>
                {stocksData.map((stock, idx) => (
                  <React.Fragment key={idx}>
                    <Grid container direction="column">
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit" onClick={() => setGraph(idx)} sx={{ cursor: 'pointer' }}>
                              {stock.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                  {stock.price} INR
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '5px',
                                    bgcolor: stock.pnl < 0 ? 'orange.light' : 'success.light',
                                    color: stock.pnl < 0 ? 'orange.dark' : 'success.dark',
                                    marginLeft: stock.pnl < 0 ? 1.875 : 2
                                  }}
                                >
                                  {stock.pnl < 0 ? (
                                    <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                  ) : (
                                    <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                                  )}
                                </Avatar>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2" sx={{ color: stock.pnl < 0 ? 'orange.dark' : 'success.dark' }}>
                          {String(stock.pnl).replace('-', '')}% {stock.pnl < 0 ? 'Loss' : 'Profit'}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 1.5 }} />
                  </React.Fragment>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}></CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
