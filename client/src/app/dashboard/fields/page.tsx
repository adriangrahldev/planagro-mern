"use client"
import { FieldsTable } from "@/components/fields/FieldsTable";
import { useUser } from "@/contexts/UserContext";
import { Field } from "@/interfaces/field.interface";
import FieldService from "@/services/FieldService";
import { ArrowDownCircleIcon, ArrowDownOnSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

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

  const handleDelete = async (id: string) => {
    try {
      const authToken = user?.authToken || ''; // Provide a default value of an empty string if authToken is undefined
      await FieldService.deleteField(id, authToken);
      fetchFields();
    } catch (error) {
      console.error(error);
    }
  }
  

  const onGetExportField = async (title?: string, worksheetname?: string) => {
    try {
      // Check if the action result contains data and if it's an array
      if (fields && Array.isArray(fields)) {
        const dataToExport = fields.map((field: Field) => ({
          NOMBRE: field.name,
          "ÁREA (ha.)": field.surface,
          "FECHA DE CREACION": field.createdAt,
        })
          ,);
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
      } else {
        console.log("#==================Export Error")
      }
    } catch (error: any) {
      console.log("#==================Export Error", error.message);

    }
  };

  return (
    <div className="bg-green-100 p-4">
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-semibold mb-4">Campos</h1>
        <div className="flex gap-2">
        <Link href="/dashboard/fields/create" className="flex items-center gap-1 p-1 rounded-md bg-green-300 shadow-md">
          <PlusCircleIcon width={24}/> Agregar campo
        </Link>
        <button type="button" onClick={
          () => onGetExportField("Campos", "Campos")
        } className="flex items-center gap-1 p-1 rounded-md bg-white text-green-600 border-[2px] border-green-500 shadow-md">
          <ArrowDownOnSquareIcon width={24}/> Exportar
        </button>
        </div>
      </div>

      <div className="p-2 bg-white rounded-md">
        <FieldsTable handleDelete={handleDelete} fields={fields} />
      </div>      

    </div>
  );
};
export default FieldsPage;