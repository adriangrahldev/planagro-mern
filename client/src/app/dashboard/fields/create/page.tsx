"use client"
import CreateFieldForm from "@/components/fields/CreateFieldForm";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { FormEvent } from "react";

const CreateFieldPage = () => {
  const onSubmit = (event: FormEvent) => {
    const data = new FormData(event.target as HTMLFormElement);
    const name = data.get("name") as string;
    const surface = parseFloat(data.get("surface") as string);
    const latitude = parseFloat(data.get("latitude") as string);
    const longitude = parseFloat(data.get("longitude") as string);

    const field = {
      name,
      surface,
      latitude, 
      longitude,
    };

    axios.post(`/api/fields`, field,{
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((response) => {
    }).catch((error) => {
      console.error(error);
    });
  };
  
  return (
    <div className="bg-green-100 p-4">
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-semibold mb-4">Crear campo</h1>
      </div>
      <hr />
      <div className="p-2  rounded-md">
        <CreateFieldForm onSubmit={onSubmit}/>
      </div>
    </div>
  );
}

export default CreateFieldPage;
