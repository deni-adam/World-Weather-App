import React, { useRef, useEffect, useContext, useCallback } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { MapContext } from "../App";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRhZGU2IiwiYSI6ImNsOThmcTdibzA2b2gzd3A4M2MxdnI0NDIifQ.BuN219pi4oXWr46bZ0hkvA";

const zoom = 8;

function Map() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const marker = useRef(null);
  const { mapLat, mapLon, setMapLon, setMapLat } = useContext(MapContext);

  const showMarker = useCallback(
    (lat, lon) => {
      // if map is defined and marker is not yet there
      if (mapRef.current && !marker.current) {
        // add marker
        marker.current = new mapboxgl.Marker({
          draggable: true,
        })
          .setLngLat([lon, lat])
          .addTo(mapRef.current)
          .on("dragend", () => {
            const newCoords = marker.current.getLngLat();
            setMapLon(newCoords.lng);
            setMapLat(newCoords.lat);
          });
        // move the map to the marker location
        mapRef.current.setCenter([lon, lat]);
      }
    },
    [setMapLat, setMapLon]
  );

  const removeMarker = () => {
    if (mapRef.current && marker.current) {
      marker.current.remove();
      marker.current = null;
    }
  };

  useEffect(() => {
    removeMarker();
    showMarker(mapLat, mapLon);
  }, [mapLat, mapLon, showMarker]);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapLon, mapLat],
      zoom: zoom,
    });

    // Add zoom and rotation controls to the mapRef.
    mapRef.current.addControl(new mapboxgl.NavigationControl());
  }, [mapLat, mapLon]);

  return (
    <div
      ref={mapContainer}
      className="map-container"
      style={{
        width: "90%",
        margin: "20px",
      }}
    />
  );
}

export default Map;
