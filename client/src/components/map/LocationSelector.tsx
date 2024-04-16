"use client";

import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useMemo } from "react";

const mapStyles = {
  width: "100%",
  height: "50%",
};

const LocationSelector = () => {
  const libraries = useMemo(() => ["places"], []);

  const mapCenter = useMemo(
    () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
    []
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCM9ZufiFwcSQ3s4DX8X4GUl42AgD1vfQo",
    libraries: libraries as any,
  });

  if (!isLoaded) return <p>Loading...</p>;
  return (

  <div>
    <GoogleMap
      options={mapOptions}
      zoom={14}
      center={mapCenter}
      mapTypeId={google.maps.MapTypeId.ROADMAP}
      mapContainerStyle={{ width: "800px", height: "300px" }}
      onLoad={() => console.log("Map Component Loaded...")}
    />
  </div>
  )
};

export default LocationSelector;
