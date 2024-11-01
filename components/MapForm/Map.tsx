"use client";

import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useRentHomeStore } from "@/store/rentHome";

//@ts-expect-error to ignore type
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MapUpdater = ({ location }: { location: L.LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(location, 7);
    }
  }, [location, map]);

  return null;
};

const Map = () => {
  const location = useRentHomeStore((state) => state.location);

  return (
    <MapContainer
      center={(location as L.LatLngExpression) || [51, -0.09]}
      zoom={location ? 10 : 2} // Initial zoom level
      scrollWheelZoom={true}
      className="min-h-[35vh] rounded-lg z-10"
    >
      <TileLayer attribution={attribution} url={url} />
      {location && <Marker position={location as L.LatLngExpression} />}
      {location && <MapUpdater location={location as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
