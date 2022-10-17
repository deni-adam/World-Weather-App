import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhZGU2IiwiYSI6ImNsOThmcTdibzA2b2gzd3A4M2MxdnI0NDIifQ.BuN219pi4oXWr46bZ0hkvA';


function Map() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lon, setLon] = useState(14);
    const [lat, setLat] = useState(50);
    const [zoom, setZoom] = useState(2);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lon, lat],
            zoom: zoom
        });
    });

    return (
        <>
            <div ref={mapContainer}
                className="map-container"
                style={{
                    width: '90%',
                    margin: '20px',
                }}
            />
        </>
    )

}

export default Map;