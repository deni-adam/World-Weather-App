import React, { useRef, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { apiUrl } from '../api';

// ${inputValue}
function SearchPlaceElement() {
    const [currentWeather, setCurrentWeather] = useState({ data: null })
    const [inputValue, setInputValue] = useState('')
    const [result, setResult] = useState()

    const weatherUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    console.log(weatherUrl);

    const fetchData = `${apiUrl}/weather?lat=${result?.[0].lat}&lon=${result?.[0].lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    console.log(fetchData)

    const HandleClick = async() => {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        setResult(data);
    }

    useEffect(() => {
        fetch(fetchData, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            setCurrentWeather({ data: responseJson });
        });
        // console.log(currentWeather.data)
    }, []);

    console.log(currentWeather.data)
    console.log(currentWeather.data?.main?.temp)

    const handleChange = (e) => {
        setInputValue(e.target.value);
        
    };

    console.log(inputValue)

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
                    onClick={HandleClick}>
                    Hledej
                </Button>
            </FormControl>

            <div>{result?.[0]?.name} {result?.[0]?.country}</div>
            <div>Temperature {currentWeather.data?.main?.temp} °C</div>

        </>
    )
}

export default SearchPlaceElement;
