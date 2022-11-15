import './App.css';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';

import Map from './components/Map'
import SearchPlaceElement from './components/SearchPlaceElement';
import WeatherInfoCard from './components/WeatherInfoCard';

function App() {
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
                // inputValue={inputValue}
              />
            </Grid>

            {/* <Card
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
            </Card> */}

            {/* <WeatherInfoCard 
            city={city}
            weather={weather}
            /> */}


          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default App;
