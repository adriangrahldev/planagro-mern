"use client"
import { FieldsTable } from "@/components/fields/FieldsTable";
import { useUser } from "@/contexts/UserContext";
import { Field } from "@/interfaces/field.interface";
import FieldService from "@/services/FieldService";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

 const FieldsPage = () => {

  const {user} = useUser();

  const [fields, setFields] = useState<Field[]>([]);

  
  useEffect(() => {
    if(user){
      fetchFields();
    }

  }, [user]);

  const fetchFields = async () => {
    try {
      const authToken = user?.authToken || ''; // Provide a default value of an empty string if authToken is undefined
      const fields = await FieldService.getFields(authToken);
      setFields(fields);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="bg-green-100 p-4">
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-semibold mb-4">Campos</h1>
        <Link href="/dashboard/fields/create" className="flex items-center gap-1 p-1 rounded-md bg-green-300 shadow-md">
          <PlusCircleIcon width={24}/> Agregar campo
        </Link>
      </div>

      <div className="p-2 bg-white rounded-md">
        <FieldsTable fields={fields} />
      </div>      

    </div>
  );
};
export default FieldsPage;