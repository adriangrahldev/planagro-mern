"use client"
import CreateActivityForm from "@/components/activities/CreateActivityForm";
import { useUser } from "@/contexts/UserContext";
import ActivityService from "@/services/ActivityService";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const CreateActivityPage = () => {
  
  const router = useRouter();
  
  const {user} = useUser();


  const onSubmit = (event: FormEvent) => {
    const data = new FormData(event.target as HTMLFormElement);
    
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const date = data.get("date") as string;
    const status = data.get("status") as string;
    const targetField = data.get("targetField") as string;

    const activity = {
      title,
      description,
      date,
      status,
      targetField,
    };

    ActivityService.createActivity(activity, user?.authToken || "").then((data) => {
      if (data) {
        router.back(); 
      }
    }).catch((error) => {
      alert("Error al crear la actividad");
    })
  };

  return (
    <div className="bg-gray-50 p-4 shadow">
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-semibold mb-4">Crear actividad</h1>
      </div>
      <hr />
      <div className="p-2  rounded-md">
        <CreateActivityForm onSubmit={onSubmit}/>
      </div>
    </div>
  );
}

export default CreateActivityPage;
