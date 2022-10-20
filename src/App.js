import './App.css';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Map from './components/Map'
import SearchPlaceElement from './components/SearchPlaceElement';
import { apiUrl } from './api';

// lon = -0.1278
// lat = 51.5074
// `${apiUrl}/weather?lat=${lat}&lon=${lon}&exclude=daily&appid=${apiKey}

function App({inputValue, currentWeather, result}) {


  return (
    <div className="App">

      <Box
        // columnspacing={5}
        style={{
          marginTop: '40px',
        }}
      >
        <Grid container>
          <Grid xs={8}
            // md={5} lg={4}
            sx={{
              flexGrow: 1,
              '--Grid-borderWidth': '1px',
              border: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
            }}
          >
            <Map />
          </Grid>

          <Grid xs={4}
            sx={{
              flexGrow: 1,
              '--Grid-borderWidth': '1px',
              border: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
            }}
          // md={7} lg={8} spacing={4}
          >

            <Grid>
              <SearchPlaceElement 
              inputValue={inputValue}
              currentWeather={currentWeather}
              result={result}
              />
            </Grid>

            <Card
              style={{
                marginLeft: '20px',
                marginRight: '20px',
                marginTop: '20px',
              }}>
              <CardContent
              // currentWeather={currentWeather}
              >
                <CardHeader
                  // title={{result?.[0]?.name} {result?.[0]?.country}}
                  subheader="Today"
                />
                <CardMedia
                  component="img"s
                  style={{
                    width: '60%',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                  image="/weather_icons/animated/rainy-3.svg"
                  alt="Weather animation"
                />
              </CardContent>
            </Card>

          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default App;
