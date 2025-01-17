import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DateSelector = ({ selectedMonth, selectedYear, onMonthChange, onYearChange, months }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023; // Año inicial fijo
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  ).reverse();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Mes</InputLabel>
          <Select
            value={selectedMonth}
            onChange={onMonthChange}
            label="Mes"
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Año</InputLabel>
          <Select
            value={selectedYear}
            onChange={onYearChange}
            label="Año"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default DateSelector;