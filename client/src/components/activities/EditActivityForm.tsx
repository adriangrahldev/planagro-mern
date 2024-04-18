import { FormEvent, useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Field } from "@/interfaces/field.interface";
import { Activity } from "@/interfaces/activity.interface";
import { useUser } from "@/contexts/UserContext";
import FieldService from "@/services/FieldService";

interface EditActivityFormProps {
  activity: Activity,
  onSubmitEdit: (data: FormEvent) => void;
}

const EditActivityForm = ({
  activity,
  onSubmitEdit,
}: EditActivityFormProps) => {
 
  const [campos, setCampos] = useState([] as Field[]);
  const {user} = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [targetField, setTargetField] = useState("");

  useEffect(() => {
    setTitle(activity.title);
    setDescription(activity.description);
    console.log(activity.date);
    
    setDate(new Date(activity.date).toISOString().split("T")[0]);

    setStatus(activity.status);
    setTargetField(activity.targetField);
  }, [activity]);

  const handleSubmitEdit = (data: FormEvent) => {
    data.preventDefault();
    onSubmitEdit(data);

  };

  
  const fetchFields = async () => {
    try {
      const fields = await FieldService.getFields(user?.authToken || "");
      setCampos(fields);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user) {
      fetchFields();
    }
  }, [user]);

  return (
    <form
    className="create-activity-form flex flex-col gap-2"
    onSubmit={(e) => {
      handleSubmitEdit(e);
    }}
  >
    <div className="flex gap-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="font-semibold">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-96"
          placeholder="Títutlo de la actividad"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="date" className="font-semibold">
          Fecha
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-52"
          placeholder="Fecha de la actividad"
          required
        />
      </div>
    </div>
    <div className="flex gap-4">
      <div className="flex flex-col">
        <label htmlFor="status" className="font-semibold">
          Estado
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as "pending" | "completed")}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-52"
          required
        >
          <option value="pending">Pendiente</option>
          <option value="completed">Completada</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="targetField" className="font-semibold">
          Campo
        </label>
        <select
          id="targetField"
          name="targetField"
          value={targetField}
          onChange={(e) => setTargetField(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-52"
          required
        >
          {campos.map((campo) => (
            <option key={campo._id} value={campo._id} defaultValue={targetField}>
              {campo.name}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div>
      <div className="flex flex-col">
        <label htmlFor="description" className="font-semibold">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-100 border border-gray-300 rounded-md p-1 px-2 w-full h-40"
          placeholder="Descripción de la actividad"
          required
        />
      </div>
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

export default EditActivityForm;
