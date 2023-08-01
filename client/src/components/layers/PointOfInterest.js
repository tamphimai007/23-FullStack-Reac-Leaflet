// rafce
import React, { useEffect,useState } from "react";
import * as turf from "@turf/turf";
import poi from "../data/poi.json";

import { GeoJSON } from "react-leaflet";

const PointOfInterest = () => {
    const [check, setCheck] = useState(null)

  useEffect(() => {
    getYourLocation();
  }, []);

  const getYourLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //code
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;



          const roitai = handleCheck(lat, lng, poi);
          console.log("roitai", lat,lng);
          setCheck(roitai)
        },
        (err) => {
          // error
          console.log("Cannot get Location", err);
        }
      );
    } else {
      console.log("Cannot get Location");
    }
  };

  const handleCheck = (lat, lng, poi) => {
    const isPoint = turf.point([lng, lat]);
    const checkPOI = turf.booleanPointInPolygon(isPoint, poi.geometry);

    return checkPOI;
  };

  const style = {
    color: "red",
  };

  const finallStyle = check ? { color: "green" } : style;

  return <GeoJSON data={poi} style={finallStyle} />;
};

export default PointOfInterest;
