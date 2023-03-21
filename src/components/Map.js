import React, { useRef, useEffect, useState } from 'react';
import './style.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

const Map = ({ location, setLocation, isEdit }) => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_KEY;
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(location.lng);
    const [lat, setLat] = useState(location.lat);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        setLng(location.lng)
        setLat(location.lat)
    });

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        if(isEdit){     
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false,
                placeholder: 'Search for places in Berkeley'
            })
    
            map.current.addControl(geocoder);
    
            map.current.on('load', () => {
                map.current.addSource('single-point', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: []
                    }
                });
    
                map.current.addLayer({
                    id: 'point',
                    source: 'single-point',
                    type: 'circle',
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#448ee4'
                    }
                });
    
                geocoder.on('result', (e) => {
                    map.current.getSource('single-point').setData(e.result.geometry);
                    setLocation({ name: e.result.text, lng: e.result.geometry.coordinates[0], lat: e.result.geometry.coordinates[1] })
                });
            });
        }


    });


    return (
        <div ref={mapContainer} className="map-container" style={{ backgroundColor: "cyan" }} />
    )
}

export default Map;