import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import "../index.css";

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
          paddingBottom: "20px",
          // 'background-color': 'rgb(203, 184, 209, 0.2)'
          backgroundColor: "rgb(198, 212, 224, 0.4)",
          color: "#ffffff",
        }}
      >
        <CardContent sx={{ padding: 0 }}>
          <div style={{ paddingBottom: "5px", paddingTop: "15px" }}>Today</div>

          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            {city?.[0].name}
          </div>

          <div style={{ fontSize: "14px" }}>{city?.[0].country}</div>

          <CardMedia
            component="img"
            style={{
              width: "100px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            image={weatherIcons[weather?.weather[0]?.icon]}
            alt="Weather animation"
          />
        </CardContent>

        <div style={{ paddingBottom: "5px" }}>
          <span style={{ fontSize: "18px" }}>
            {weather?.weather?.[0]?.description}
          </span>
        </div>
        <div style={{ paddingBottom: "2px" }}>
          Temperature:{" "}
          <span style={{ fontSize: "28px", fontWeight: "bold" }}>
            {Math.round(weather?.main?.temp)}
          </span>{" "}
          °C
        </div>
        <div>
          Feels like:{" "}
          <span style={{ fontSize: "20px" }}>
            {Math.round(weather?.main?.feels_like)}
          </span>{" "}
          °C
        </div>
      </Card>
    </>
  );
}

export default WeatherInfoCard;
