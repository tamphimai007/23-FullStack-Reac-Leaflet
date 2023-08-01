// rafce
import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";

const BaseMapLayers = () => {
  return (
    <>
      <LayersControl.BaseLayer name="openstreetmap" checked>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>


      <LayersControl.BaseLayer name="OSM">
        <TileLayer url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>


      <LayersControl.BaseLayer name="WorldImagery">
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      </LayersControl.BaseLayer>
    </>
  );
};

export default BaseMapLayers;
