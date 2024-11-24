// Map.js
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Delete the default icon URL and set up custom marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Custom Marker Icon
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/000000/marker.png", // Example of a custom marker
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const nepalPosition = [28.3949, 84.124];

  // Inline styles for the layout
  const containerStyle = {
    height: "100vh",
    width: "100%",
    position: "relative",
  };

  const mapStyle = {
    height: "calc(100vh - 60px)", // Subtract menu bar height (60px)
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      {/* Map Container */}
      <MapContainer
        center={nepalPosition}
        zoom={6}
        style={mapStyle}
        zoomControl={false} // Disable default zoom control (we can add a custom one)
      >
        {/* Use a more aesthetic tile layer like CartoDB */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>'
        />

        {/* Add a custom marker */}
        <Marker position={nepalPosition} icon={customIcon}>
          <Popup>
            <strong>Work in Progress!</strong>
            <br />
            This location is being updated.
          </Popup>
        </Marker>

        {/* Custom Zoom Control */}
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  );
};

export default Map;
