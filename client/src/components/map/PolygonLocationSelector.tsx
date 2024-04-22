"use client";
import React, { use, useEffect, useState } from "react";
import {
  GoogleMap,
  Polygon,
  PolygonF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { LocationService } from "@/services/LocationService";


const PolyLocationSelector = ({
  initialCoords = [],
  setNewCoords = () => {},
  readOnly = false,
}: {
  initialCoords?: { lat: number; lng: number }[];
  setNewCoords?: (coords: { lat: number; lng: number }[]) => void;
  readOnly?: boolean;
}) => {
  const libraries = ["places"];
  const [coords, setCoords] = useState<null | any[]>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  
  const mapOptions: google.maps.MapOptions = {
    clickableIcons: false,
    scrollwheel: true,
    draggable: !readOnly,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    noClear: false,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAwHhg92jVfj3JYfvvw7Qr5fNKXdMFfl4I",
    libraries: libraries as any,
    id: "google-map-script",
  });

  useEffect(() => {
    if (initialCoords!.length > 0) {
      setCenter(initialCoords![0]);
      setCoords(initialCoords);
    } else {
      LocationService.getNavigatorLocation()
        .then((position: any) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        })
        .catch((error: any) => {
          alert("No se pudo obtener la ubicación actual");
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (coords) {
      setNewCoords(coords);
    }
  }, [coords]);

  if (!isLoaded) return <p>Loading...</p>;
  else
    return (
      <div>
        <GoogleMap
          options={mapOptions}
          zoom={16}
          center={center}
          mapTypeId={google.maps.MapTypeId.HYBRID}
          mapContainerStyle={{ width: "800px", height: "300px" }}
          onClick={(e) => {
            if (!readOnly) {
              const newMarker = {
                lat: e.latLng?.lat() || 0,
                lng: e.latLng?.lng() || 0,
              };
              setCoords(coords ? [...coords, newMarker] : [newMarker]);
            }
          }}
        >
          {coords?.length! > 0 && (
            <PolygonF
              path={coords as any[]}
              options={{
                fillColor: "#f00",
                fillOpacity: 0.35,
                strokeColor: "#f00",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                editable: !readOnly,
                strokePosition: google.maps.StrokePosition.CENTER,
              }}
              editable={!readOnly}
              onEdit={(e) => {
                const newCoords = e
                  .getPath()
                  .getArray()
                  .map((coord) => {
                    return { lat: coord.lat(), lng: coord.lng() };
                  });
                setCoords(newCoords);
              }}
            />
          )}
        </GoogleMap>
      </div>
    );
};

export default PolyLocationSelector;
