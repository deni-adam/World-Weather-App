import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';

function WeatherInfoCard({city, weather}) {
    return (
        <>
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
                        title={city?.name}
                        //   {{city?.name} {city?.country}}
                        subheader="Today"
                    />
                    <CardMedia
                        component="img" 
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

                <div>{weather?.weather?.[0]?.description}</div>
                <div>Temperature: {weather?.main?.temp} °C</div>
                <div>Feels like: {weather?.main?.feels_like} °C</div>

            </Card>
        </>
    )
}

export default WeatherInfoCard;