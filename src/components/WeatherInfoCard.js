import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";

const weatherIcons = {
  "01d": "/weather_icons/animated/day.svg",
  "01n": "/weather_icons/animated/night.svg",
  "02d": "/weather_icons/animated/cloudy-day-2.svg",
  "02n": "/weather_icons/animated/cloudy-night-3.svg",
  "03d": "/weather_icons/animated/cloudy.svg",
  "03n": "/weather_icons/animated/cloudy.svg",
  "04d": "/weather_icons/animated/cloudy.svg",
  "04n": "/weather_icons/animated/cloudy.svg",
  "50d": "/weather_icons/animated/cloudy.svg",
  "50n": "/weather_icons/animated/cloudy.svg",
  "09d": "/weather_icons/animated/rainy-7.svg",
  "09n": "/weather_icons/animated/rainy-7.svg",
  "10d": "/weather_icons/animated/rainy-5.svg",
  "10n": "/weather_icons/animated/rainy-5.svg",
  "11d": "/weather_icons/animated/thunder.svg",
  "11n": "/weather_icons/animated/thunder.svg",
  "13d": "/weather_icons/animated/snowy-6.svg",
  "13n": "/weather_icons/animated/snowy-6.svg",
};

function WeatherInfoCard({ city, weather }) {
  return (
    <>
      <Card
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "20px",
        }}
      >
        <CardContent
        // currentWeather={currentWeather}
        >
          <CardHeader
            // title={{city?.[0].name} {city?.[0].country}}
            subheader="Today"
          />

          <div>
            {city?.[0].name} {city?.[0].country}
          </div>
          <CardMedia
            component="img"
            style={{
              width: "60%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            image={weatherIcons[weather?.weather[0]?.icon]}
            alt="Weather animation"
          />
        </CardContent>

        <div>{weather?.weather?.[0]?.description}</div>
        <div>Temperature: {weather?.main?.temp} °C</div>
        <div>Feels like: {weather?.main?.feels_like} °C</div>
      </Card>
    </>
  );
}

export default WeatherInfoCard;
