"use client";
import Loading from "@/components/commons/loading";
import EditFieldForm from "@/components/fields/EditFieldForm";
import { useUser } from "@/contexts/UserContext";
import { Field } from "@/interfaces/field.interface";
import FieldService from "@/services/FieldService";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const EditFieldPage = () => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const [field, setField] = useState<Field | null>(null);

  const { user } = useUser();

  const onSubmitEdit = async (event: FormEvent) => {
    try {
      const data = new FormData(event.target as HTMLFormElement);
      const fieldData = {
        name: data.get("name") as string,
        surface: parseFloat(data.get("surface") as string),
        latitude: data.get("latitude") as string,
        longitude: data.get("longitude") as string,
      };
      FieldService.updateField(id, fieldData, user?.authToken || "")
        .then((field) => {
          setField(field);
          router.back();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getField = async () => {
    try {
      FieldService.getFieldById(id, user?.authToken || "").then((field) => {
        setField(field);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getField();
    }
  }, [user]);

  if (!field) {
    return <Loading />;
  }

  return(
    <div className="bg-gray-50 rounded p-4 shadow">
    <div className="flex items-start justify-between">
      <h1 className="text-xl font-semibold mb-4">Crear campo</h1>
    </div>
    <hr />
    <div className="p-2  rounded-md">
      <EditFieldForm onSubmitEdit={onSubmitEdit} field={field}/>
    </div>
  </div>
  )
};

export default EditFieldPage;
