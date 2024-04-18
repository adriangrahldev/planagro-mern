"use client";

import { FormEvent, useState } from "react";
import LocationSelector from "../map/LocationSelector";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const CreateFieldForm = ({onSubmit}:{onSubmit:CallableFunction  }) => {
  const [name, setName] = useState("");
  const [surface, setSurface] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const onSubmitLocal = (data: FormEvent) => {
    data.preventDefault();
    if (!latitude || !longitude) {
        alert("Por favor, selecciona una ubicación en el mapa");
    }else{
        onSubmit(data);
    }


  };

  return (
    <form className="create-field-form flex flex-col gap-2" onSubmit={(e) => {onSubmitLocal(e)}}>
      
      <div className="flex gap-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-96"
          placeholder="Nombre del campo"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="surface" className="font-semibold">
          Superficie (ha)
        </label>
        <input
          type="number"
          id="surface"
          name="surface"
          value={surface}
          onChange={(e) => setSurface(parseFloat(e.target.value || ""))}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-52"
          placeholder="Superficie del campo"
          step="0.01"
          pattern="^\d+(\.\d+)?$"
          title="Por favor, introduce un número entero o decimal"
          required
        />
      </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="latitude" className="font-semibold">
          Ubicación
        </label>
        <input type="text" name="longitude" hidden value={longitude} onChange={(e)=> setLongitude(e.target.value)} />
        <input type="text" name="latitude" hidden value={latitude} onChange={(e)=> setLongitude(e.target.value)}/>
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
