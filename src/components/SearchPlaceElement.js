import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { cityAutocomplete, fetchWeather, geocodeCity } from "../api";

import WeatherInfoCard from "./WeatherInfoCard";

function SearchPlaceElement() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);
  const [option, setOption] = useState(null);
  const [address, setAddress] = useState("");

  // console.log(value);
  // console.log(value?.label);

  // const options = ["London", "Oslo", "Tokio", "Perth", "Boston"];

  const optionsList = address.map((option, index) => ({
    id: index + 1,
    label: option,
  }));

  const [showCard, setShowCard] = useState(false);

  const handleClick = async () => {
    const city = await geocodeCity(value?.label);

    if (!city) {
      alert("city not found");
      return;
    }

    setCity(city);

    // console.log({ "city api": city });
    // console.log(city?.[0].lat);
    // console.log(city?.[0].lat);

    const weather = await fetchWeather(city?.[0].lat, city?.[0].lon);
    // console.log(weather);
    setWeather(weather);

    setShowCard(true);
  };

  const handleChange = async (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);

    const address = await cityAutocomplete(inputValue);
    console.log(address);

    setAddress(address);
  };

  return (
    <>
      <FormControl variant="standard">
        <Autocomplete
          options={optionsList}
          value={option}
          renderInput={(params) => (
            <TextField {...params} label="Find a location" fullWidth />
          )}
          sx={{ width: 300, marginTop: 5 }}
          // onChange={(event, newValue) => {
          //   setOption(newValue ? [newValue, ...option] : option);
          //   setValue(newValue);
          //   console.log(newValue);
          // } }
          onChange={handleChange}
        />

        <Button onClick={handleClick}>Hledej</Button>

        <div>
          {showCard === true && (
            <WeatherInfoCard city={city} weather={weather} />
          )}
        </div>
      </FormControl>
    </>
  );
}

export default SearchPlaceElement;
