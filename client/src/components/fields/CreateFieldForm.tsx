"use client";

import { FormEvent, useState } from "react";
import LocationSelector from "../map/LocationSelector";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const CreateFieldForm = () => {
  const [name, setName] = useState("");
  const [surface, setSurface] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const onSubmit = (data: FormEvent) => {
    data.preventDefault();
    if (!latitude || !longitude) {
        alert("Por favor, selecciona una ubicación en el mapa");
    }
    else {
        console.log({ name, surface, latitude, longitude });
    }
  };

  return (
    <form className="create-field-form flex flex-col gap-2" onSubmit={(e) => {onSubmit(e)}}>
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-96"
          placeholder="Nombre del campo"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="surface" className="font-semibold">
          Superficie (ha)
        </label>
        <input
          type="number"
          id="surface"
          value={surface}
          onChange={(e) => setSurface(parseFloat(e.target.value || ""))}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-52"
          placeholder="Superficie del campo"
          step="0.01"
          pattern="^\d+(\.\d+)?$"
          title="Por favor, introduce un número entero o decimal"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="latitude" className="font-semibold">
          Ubicación
        </label>
        <LocationSelector
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-green-500 flex  text-white p-2 rounded-md px-4 gap-2"
        >
          <CheckCircleIcon width={24} /> Guardar
        </button>
      </div>
    </form>
  );
};

export default CreateFieldForm;
