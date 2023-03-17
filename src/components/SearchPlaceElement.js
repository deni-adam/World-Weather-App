import React, { useContext, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { MapContext } from "../App";
import { cityAutocomplete, fetchWeather, geocodeCity } from "../api";
import WeatherInfoCard from "./WeatherInfoCard";

function SearchPlaceElement() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState({});
  const [options, setOptions] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const { setMapLat, setMapLon } = useContext(MapContext);

  const handleClick = async (cityName) => {
    const city = await geocodeCity(cityName);

    if (!city) {
      alert("city not found");
      return;
    }
    setCity(city);

    const weather = await fetchWeather(city?.[0].lat, city?.[0].lon);
    setWeather(weather);
    setShowCard(true);

    setMapLon(city?.[0].lon);
    setMapLat(city?.[0].lat);
  };

  const handleInputChange = async (e) => {
    const inputValue = e.target.value;

    if (inputValue) {
      const addressFromApi = (await cityAutocomplete(inputValue)).results;

      const filteredAdressses = addressFromApi.filter((result) => {
        // filter out all results that don't have city nor district defined -> this will avoid having `undefined` in the options
        if (!result.city && !result.district) {
          return false;
        }
        return true;
      });
      const newOptions = filteredAdressses.map((adress) => {
        return `${adress.city ?? adress.district}, ${adress.country}`;
      });
      // remove duplicates
      const uniqueOptions = [...new Set(newOptions)];
      setOptions(uniqueOptions);
    }
  };
  const handleAutocompleteChange = async (e, value) => {
    if (value) {
      handleClick(value);
    }
  };

  return (
    <FormControl variant="standard">
      <Autocomplete
        options={options}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField {...params} label="Find a location" fullWidth />
        )}
        sx={{
          width: 300,
          marginTop: 5,
          /*backgroundColor: "#734b6d"*/
        }}
        isOptionEqualToValue={() => true}
      />

      {/* <Button onClick={handleClick}>Hledej</Button> */}

      <div>
        {showCard === true && <WeatherInfoCard city={city} weather={weather} />}
      </div>
    </FormControl>
  );
}

export default SearchPlaceElement;
