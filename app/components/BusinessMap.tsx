/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// fix marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Olympic Building Maseru (approx coords — adjust if needed)
const position: [number, number] = [-29.30632812013288, 27.467100417260426];

export default function BusinessMap() {
  return (
    <div className="h-75 sm:h-87.5 md:h-100 lg:h-112.5 w-full">
      <MapContainer
        center={position}
        zoom={17}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      <Marker position={position}>
        <Popup>
          <strong>Tshedy Beauty Parlour</strong>
          <br />
          Olympic Building — Room 4
          <br />
          Maseru
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
}
