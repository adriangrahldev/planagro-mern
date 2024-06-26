"use client"
import CreateFieldForm from "@/components/fields/CreateFieldForm";
import { useUser } from "@/contexts/UserContext";
import FieldService from "@/services/FieldService";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const CreateFieldPage = () => {
  
  const router = useRouter();
  
  const {user} = useUser();


  const onSubmit = (event: FormEvent) => {
    const data = new FormData(event.target as HTMLFormElement);
    const name = data.get("name") as string;
    const surface = parseFloat(data.get("surface") as string);
    const coords = data.get("coords") as string;

    const field = {
      name,
      surface,
      coords: JSON.parse(coords),
    };
    
    FieldService.createField(field, user?.authToken || "").then((data) => {
      if (data) {
        router.back(); 
      }
    }).catch((error) => {
      console.error(error);
    })
  };

  return (
    <div className="bg-gray-50 p-4 shadow">
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
