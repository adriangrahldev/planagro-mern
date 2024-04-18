"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

const LocationSelector = ({ latitude, longitude,  setLatitude, setLongitude, readOnly=false }:
  {
    latitude: string;
    longitude: string;
    setLatitude?: (latitude: string) => void;
    setLongitude?: (longitude: string) => void;
    readOnly?: boolean;
  }
) => {
  const [marker, setMarker] = useState({ lat: 0, lng: 0 });
  console.log(latitude, longitude);
  
  const mapOptions = {
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: false,
    draggable: readOnly ? false : true,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAwHhg92jVfj3JYfvvw7Qr5fNKXdMFfl4I",
    libraries: libraries as any,
  });

  useEffect(() => {
    if (latitude && longitude) {
      setMarker({
        lat: Number.parseFloat(latitude),
        lng: Number.parseFloat(longitude),
      });
      
    }else{
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }
  }, []);

  useEffect(() => {
    if(!readOnly){
      setLatitude(marker.lat);
      setLongitude(marker.lng);
    }
  }, [marker]);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={marker}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "800px", height: "300px" }}
        onClick={(e) => {
          !readOnly ? setMarker({ lat: e.latLng?.lat() || 0, lng: e.latLng?.lng() || 0 }) : null;
        
        }}
      >
        {
            marker.lat && marker.lng && (
                <Marker position={marker} />
            )
        }

      </GoogleMap>
    </div>
  );
};

export default LocationSelector;
