import { FormEvent, useState } from "react";
import LocationSelector from "../map/LocationSelector";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Field } from "@/interfaces/field.interface";

interface EditFieldFormProps {
  field: Field,
  onSubmitEdit: (data: FormEvent) => void;
}

const EditFieldForm = ({
  field,
  onSubmitEdit,
}: EditFieldFormProps) => {
  
  const [fieldName, setFieldName] = useState(field.name);
  const [fieldSurface, setFieldSurface] = useState(field.surface);
  const [fieldLatitude, setFieldLatitude] = useState(field.latitude);
  const [fieldLongitude, setFieldLongitude] = useState(field.longitude);


  const handleSubmitEdit = (data: FormEvent) => {
    data.preventDefault();
    if (!fieldLatitude || !fieldLongitude) {
      alert("Por favor, selecciona una ubicación en el mapa");
    } else {
      onSubmitEdit(data);
    }
  };

  return (
    <form
      className="edit-field-form flex flex-col gap-2"
      onSubmit={(e) => {
        handleSubmitEdit(e);
      }}
    >
      <div className="flex gap-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
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
          value={fieldSurface}
          onChange={(e) => setFieldSurface(parseFloat(e.target.value || ""))}
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
        <input type="text" name="longitude" hidden value={fieldLongitude} />
        <input type="text" name="latitude" hidden value={fieldLatitude} />
        <LocationSelector
          latitude={fieldLatitude}
          longitude={fieldLongitude}
          setLatitude={setFieldLatitude}
          setLongitude={setFieldLongitude}
          readOnly={false}
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-green-500 flex  text-white p-2 rounded-md px-4 gap-2"
        >
          <CheckCircleIcon width={24} /> Actualizar
        </button>
      </div>
    </form>
  );
};

export default EditFieldForm;
