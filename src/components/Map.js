import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { MapContext } from "../App";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRhZGU2IiwiYSI6ImNsOThmcTdibzA2b2gzd3A4M2MxdnI0NDIifQ.BuN219pi4oXWr46bZ0hkvA";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lon, setLon] = useState(14.4378);
  // const [lat, setLat] = useState(50.0755);
  const [zoom, setZoom] = useState(2);
  const marker = useRef(null);
  const { mapLat, mapLon, setMapLon, setMapLat } = useContext(MapContext);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapLon, mapLat],
      zoom: zoom,
    });

    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add the control to the map.
    // map.current.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //   })
    // );
  }, []);

  const showMarker = () => {
    // if map is defined and marker is not yet there
    if (map.current && !marker.current) {
      // add marker
      marker.current = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat([mapLon, mapLat])
        .addTo(map.current)
        .on("dragend", () => {
          const newCoords = marker.current.getLngLat();
          console.log({ newCoords });

          setMapLon(newCoords.lng);
          setMapLat(newCoords.lat);
        });
    }
  };

  const removeMarker = () => {
    if (map.current) {
      // if marker already exists, remove it first
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
    }
  };

  return (
    <>
      <button onClick={showMarker}>zobrazit bod</button>
      <button onClick={removeMarker}>skryt bod</button>
      current coords: <br />
      Latitude: {mapLat}, Longitude: {mapLon}
      <div
        ref={mapContainer}
        className="map-container"
        style={{
          width: "90%",
          margin: "20px",
        }}
      />
    </>
  );
}

export default Map;
