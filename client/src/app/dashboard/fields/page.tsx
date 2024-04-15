import { FieldsTable } from "@/components/fields/FieldsTable";
import { Field } from "@/interfaces/field.interface";
import FieldService from "@/services/FieldService";
import { useEffect, useState } from "react";

const FieldsPage = () => {
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const fields = await FieldService.getFields();
      setFields(fields);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Fields</h1>
      <FieldsTable fields={fields} />
    </div>
  );
};
