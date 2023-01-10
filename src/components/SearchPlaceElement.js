import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { MapContext } from "../App";
import { cityAutocomplete, fetchWeather, geocodeCity } from "../api";
import WeatherInfoCard from "./WeatherInfoCard";

function SearchPlaceElement() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState({});
  const [value, setValue] = useState("");
  const [address, setAddress] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const { mapLat, setMapLat, mapLon, setMapLon } = useContext(MapContext);

  const handleClick = async (cityName) => {
    const city = await geocodeCity(cityName);

    if (!city) {
      alert("city not found");
      return;
    }

    setCity(city);

    console.log({ "city api": city });

    const weather = await fetchWeather(city?.[0].lat, city?.[0].lon);
    setWeather(weather);
    setShowCard(true);

    // setMapLonLat({ lat: city?.[0].lat, lon: city?.[0].lon });
    setMapLon(city?.[0].lon);
    setMapLat(city?.[0].lat);

    console.log(mapLon);
    console.log(mapLat);
  };

  const handleChange = async (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (inputValue) {
      const address = await cityAutocomplete(inputValue);

      const addressResults = [];
      address.results
        .filter((result) => {
          // filter out all results that don't have city nor district defined -> this will avoid having `undefined` in the options
          if (!result.city && !result.district) {
            return false;
          }
          return true;
        })
        .forEach((result) => {
          const name = `${result.city ?? result.district}, ${result.country}`;

          // if `name` doesn't exist yet, add it to array - this is to prevent duplicate values
          // -1 is returned when record is not found in the array
          const alreadyExists =
            addressResults.findIndex((item) => item.name === name) !== -1;
          if (!alreadyExists) {
            addressResults.push({
              name: `${result.city ?? result.district}, ${result.country}`,
            });
          }
        });

      setAddress(addressResults);
    }
  };

  return (
    <>
      <FormControl variant="standard">
        <Autocomplete
          options={address.map((option) => ({
            label: option.name,
          }))}
          value={value}
          onChange={(params, value) => {
            const inputValue = value?.label ?? "";
            setValue(inputValue);

            if (inputValue) {
              handleClick(inputValue);
            }
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
