import React from "react";

import { LayersControl, LayerGroup } from "react-leaflet";
import Province from "./Province";
import BaseMapLayers from "./BaseMapLayers";
import PointOfInterest from "./PointOfInterest";
import WeatherLayers from "./WeatherLayers";

const ConbineLayers = () => {
  return (
    <LayersControl position="topright">
      {/* Layer 1 */}

      <LayersControl.Overlay name="Thailand" checked>
        <Province />
      </LayersControl.Overlay>

      {/* Layer 2 */}
      <BaseMapLayers />

      {/* Layer 3 */}
      <LayersControl.Overlay name="POI" checked>
        <PointOfInterest />
      </LayersControl.Overlay>

      {/* Layer 4 */}
      <LayersControl.Overlay name="Weather">
        <LayerGroup>
        <WeatherLayers />

        </LayerGroup>
      </LayersControl.Overlay>
    </LayersControl>
  );
};

export default ConbineLayers;
