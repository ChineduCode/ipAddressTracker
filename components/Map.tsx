'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const customIcon = L.icon({
    iconUrl: '/images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [23, 56],
});

interface MapProps {
    lat: number;
    lng: number;
}

function ChangeView({ lat, lng }: MapProps) {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], 13);
    }, [lat, lng, map]);
    return null;
}

export default function Map({ lat, lng }: MapProps) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} icon={customIcon} />
            <ChangeView lat={lat} lng={lng} />
        </MapContainer>
    );
}
