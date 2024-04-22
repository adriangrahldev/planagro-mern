"use client";
import Loading from "@/components/commons/loading";
import PolyLocationSelector from "@/components/map/PolygonLocationSelector";
import { useUser } from "@/contexts/UserContext";
import { Field } from "@/interfaces/field.interface";
import FieldService from "@/services/FieldService";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewFieldPage = () => {
  const { user } = useUser();

  const { id } = useParams<{ id: string }>();
  const [field, setField] = useState<Field | undefined>(undefined);

  const getField = async () => {
    FieldService.getFieldById(id, user?.authToken || "")
      .then((field) => setField(field))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (user) {
      getField();
    }
  }, [user]);
  if (!field) {
    return <Loading />;
  }

return (
    <div className="bg-gray-50 rounded p-4 shadow">
        <div className="flex items-start justify-between">
            <h1 className="text-xl font-semibold mb-4">{field.name}</h1>
            <div className="flex gap-4">
                <a href={`/dashboard/fields/${field._id}/edit`} className="text-blue-500 flex gap-2 items-center">
                    <PencilIcon className="h-4 w-4" />
                    Editar campo

                </a>
            </div>
        </div>
        <hr />
        <div className="p-2 rounded-md">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <p className="text-gray-500 font-semibold">Área</p>
                    <p>{field.surface} ha.</p>
                </div>
                <div>
                    <p className="text-gray-500 font-semibold">Ubicación</p>
                    <PolyLocationSelector initialCoords={field.coords} readOnly={true}/>
                </div>
            </div>
            
        </div>
    </div>
);
};

export default ViewFieldPage;
