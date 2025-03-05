import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IconSearch, IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const HeaderAvatar = React.forwardRef(({ children, ...others }, ref) => {
  const theme = useTheme();
  return (
    <Avatar
      ref={ref}
      variant="rounded"
      sx={{
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        bgcolor: 'secondary.light',
        color: 'secondary.dark',
        '&:hover': {
          bgcolor: 'secondary.dark',
          color: 'secondary.light'
        }
      }}
      {...others}
    >
      {children}
    </Avatar>
  );
});

const stocks = [
  { symbol: 'BAJAJFINSV.NS', name: 'Bajaj Finserv' },
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd' },
  { symbol: 'ZOMATO.NS', name: 'Zomato' },
  { symbol: 'ADANIENT.NS', name: 'Adani Enterprises Ltd' },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors Ltd' }
];

const suggestions = stocks.map((stock) => ({
  label: stock.name,
  symbol: stock.symbol,
  name: stock.name,
  url: `/stockchart`
}));

const SearchSection = () => {
  const [value, setValue] = useState('');

  const handleSelect = (event, selectedOption) => {
    if (selectedOption) {
      localStorage.setItem('symbol', selectedOption.symbol);
      localStorage.setItem('name', selectedOption.name);
      window.location.reload();
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      getOptionLabel={(option) => option.label}
      onInputChange={(event, newInputValue) => setValue(newInputValue)}
      onChange={handleSelect}
      renderOption={(props, option) => (
        <li {...props}>
          <Link to={option.url}>{option.label}</Link>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search"
          variant="outlined"
          sx={{ width: { md: 250, lg: 434 }, ml: 2, px: 2 }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch stroke={1.5} size="16px" />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
};

export default SearchSection;
