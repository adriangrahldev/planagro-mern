"use client"
import React, { use, useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker, Polygon } from "@react-google-maps/api";

const libraries = ["places"];

const PolyLocationSelector = ({
  coords = [],
  setCoords = () => {},
  readOnly = false,
}: {
  coords?: { lat: number; lng: number }[];
  setCoords?: (coords: { lat: number; lng: number }[]) => void;
  readOnly?: boolean;
}) => {
  const [markers, setMarkers] = useState(coords);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    clickableIcons: true,
    scrollwheel: true,
    draggable: !readOnly,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: true,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAwHhg92jVfj3JYfvvw7Qr5fNKXdMFfl4I",
    libraries: libraries as any,
  });

  useEffect(() => {
    if (coords.length > 0) {
      const newMarkers = coords.map((coord) => ({
        lat: coord.lat,
        lng: coord.lng,
      }));
      setMarkers(newMarkers);
      setCenter(newMarkers[0]);
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCenter({
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
    if (!readOnly) {
      setCoords(markers);
    }
  }, [markers]);

  const onMarkerDrag = (e: any, marker: any) => {
    if (!readOnly) {
      const newMarker = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      const updatedMarkers = markers.map((m) => (m === marker ? newMarker : m));
      setMarkers(updatedMarkers);
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={center}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "800px", height: "300px" }}
        onClick={(e) => {
          if (!readOnly) {
            const newMarker = {
              lat: e.latLng?.lat() || 0,
              lng: e.latLng?.lng() || 0,
            };
            setMarkers([...markers, newMarker]);
          }
        }}
      >
        <Polygon
          paths={markers}
          options={{
            fillColor: "#f00",
            fillOpacity: 0.35,
            strokeColor: "#f00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />

        {markers.map((marker, index) => (
          <Marker
            draggable={!readOnly}
            onDragEnd={(e) => onMarkerDrag(e, marker)}
            key={index}
            position={marker}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: "#f00",
              fillOpacity: 1,
              strokeWeight: 0,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default PolyLocationSelector;
