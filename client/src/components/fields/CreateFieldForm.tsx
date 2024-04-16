"use client";

import { FormEvent, useState } from "react";
import LocationSelector from "../map/LocationSelector";

const CreateFieldForm = () => {
  const [name, setName] = useState("");
  const [surface, setSurface] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const onSubmit = (data: FormEvent) => {};

return (
    <form className="create-field-form flex flex-col gap-2" onSubmit={onSubmit}>
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
                Latitud
            </label>
            <LocationSelector />
        </div>
    </form>
);
};

export default CreateFieldForm;
