import React, { useRef, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchWeather, geocodeCity } from '../api';

function SearchPlaceElement() {
    const [weather, setWeather] = useState({})
    const [city, setCity] = useState({})
    const [inputValue, setInputValue] = useState('')

    const handleClick = async() => {
        const city = (await geocodeCity(inputValue))?.[0]
        if (!city) {
            alert('city not found')
            return
        }
        console.log(city)
        setCity(city)

        const weather = await fetchWeather(city.lat, city.lon);
        console.log(weather)
        setWeather(weather)
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <>
            <FormControl variant="standard">
                <Input
                    id="input-with-icon-adornment"
                    style={{ paddingTop: '20px' }}
                    onChange={handleChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
                <Button
                    onClick={handleClick}>
                    Hledej
                </Button>
            </FormControl>

            <div>{city?.name} {city?.country}</div>
            <div>Temperature {weather?.main?.temp} °C</div>

        </>
    )
}

export default SearchPlaceElement;
