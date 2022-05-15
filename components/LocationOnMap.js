import React from "react";

import dynamic from "next/dynamic";
const LocationOnMap = ({ selectedLocation }) => {
  const Map = dynamic(() => import("/components/Map.js"), {
    ssr: false,
  });
  return <Map selectedLocation={selectedLocation} />;
};

export default LocationOnMap;
