import "./App.css";
import React, { createContext, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import CardHeader from "@mui/material/CardHeader";

import Map from "./components/Map";
import SearchPlaceElement from "./components/SearchPlaceElement";
// import WeatherInfoCard from "./components/WeatherInfoCard";
// import { apiUrl } from "./api";

// lon = -0.1278
// lat = 51.5074
// `${apiUrl}/weather?lat=${lat}&lon=${lon}&exclude=daily&appid=${apiKey}

export const MapContext = createContext();

function App() {
  // const [mapLonLat, setMapLonLat] = useState({});
  const [mapLon, setMapLon] = useState(14.4378);
  const [mapLat, setMapLat] = useState(50.0755);

  return (
    <div className="App">
      <MapContext.Provider value={{ mapLat, setMapLat, mapLon, setMapLon }}>
        <Box
          // columnspacing={5}
          style={{
            marginTop: "40px",
          }}
        >
          <Grid container>
            <Grid
              xs={8}
              // md={5} lg={4}
              sx={{
                flexGrow: 1,
                "--Grid-borderWidth": "1px",
                border: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
              }}
            >
              <Map />
            </Grid>

            <Grid
              xs={4}
              sx={{
                flexGrow: 1,
                "--Grid-borderWidth": "1px",
                border: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
              }}
              // md={7} lg={8} spacing={4}
            >
              <Grid>
                <SearchPlaceElement />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MapContext.Provider>
    </div>
  );
}

export default App;
