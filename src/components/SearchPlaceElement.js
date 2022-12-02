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
  const [value, setValue] = useState("");
  const [address, setAddress] = useState([]);

  // console.log(value);
  // console.log(value?.label);

  // const options = ["London", "Oslo", "Tokio", "Perth", "Boston"];

  const optionsList = address.map((option, index) => ({
    id: index + 1,
    label: option.name,
  }));

  const [showCard, setShowCard] = useState(false);

  const handleClick = async (cityName) => {
    const city = await geocodeCity(cityName);

    if (!city) {
      alert("city not found");
      return;
    }

    setCity(city);

    console.log({ "city api": city });
    // console.log(city?.[0].lat);
    // console.log(city?.[0].lat);

    const weather = await fetchWeather(city?.[0].lat, city?.[0].lon);
    // console.log(weather);
    setWeather(weather);

    setShowCard(true);
  };

  const handleChange = async (e) => {
    setValue(e.target.value);
    console.log(e.target.value);

    const address = await cityAutocomplete(e.target.value);
    console.log(address);
    console.log(
      address.results
        .filter((location) => {
          if (typeof location === "undefined") {
            return false;
          } else {
            return true;
          }
        })
        .map((result) => {
          return result?.city;
        })
    );

    setAddress(
      address.results.map((result) => {
        return { name: `${result.city ?? result.district}, ${result.country}` };
      })
    );
  };

  return (
    <>
      <FormControl variant="standard">
        <Autocomplete
          options={optionsList}
          value={value}
          onChange={(params, value) => {
            setValue(value.label);
            handleClick(value.label);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={handleChange}
              label="Find a location"
              fullWidth
            />
          )}
          sx={{ width: 300, marginTop: 5 }}
        />

        {/* <Button onClick={handleClick}>Hledej</Button> */}

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
