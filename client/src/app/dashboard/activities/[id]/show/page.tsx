"use client";
import Loading from "@/components/commons/loading";
import PolyLocationSelector from "@/components/map/PolygonLocationSelector";
import { useUser } from "@/contexts/UserContext";
import { Activity } from "@/interfaces/activity.interface";
import { Field } from "@/interfaces/field.interface";
import ActivityService from "@/services/ActivityService";
import { MapIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewActivityPage = () => {
  const { user } = useUser();

  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | undefined>(undefined);

  const getActivity = async () => {
    ActivityService.getActivityById(id, user?.authToken || "")
      .then((activity) => setActivity(activity))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (user) {
      getActivity();
    }
  }, [user]);
  if (!activity) {
    return <Loading />;
  }

return (
    <div className="bg-gray-50 rounded p-4 shadow">
        <div className="flex items-start justify-between">
            <h1 className="text-xl font-semibold mb-4">{activity.title}</h1>
            <div className="flex gap-4">
                <a href={`/dashboard/activities/${activity._id}/edit`} className="text-blue-500 flex gap-2 items-center">
                    <PencilIcon className="h-4 w-4" />
                    Editar actividad

                </a>
            </div>
        </div>
        <hr />
        <div className="p-2 rounded-md">
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <p className="text-gray-500 font-semibold">Descripción</p>
                    <p>{activity.description}</p>
                </div>
                <div>
                    <p className="text-gray-500 font-semibold">Fecha</p>
                    <p>{new Date(activity.date).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="text-gray-500 font-semibold">Estado</p>
                    <p
                        className={`w-fit px-2 py-1  ${
                            activity.status === "pending" ? "bg-yellow-200 text-gray-600" : "bg-green-400 text-white"
                        } text-sm font-semibold rounded-md shadow`}
                    >
                        {activity.status === "pending" ? "PENDIENTE" : "COMPLETADO"}
                    </p>{" "}
                </div>
            </div>
            <div className="mt-4">
                <p className="text-gray-500 font-semibold">Campo</p>
                <p className="flex gap-4">
                    <p>
                        {(activity.targetField as Field).name} <small>({(activity.targetField as Field).surface} ha)</small>
                    </p>
                </p>
            </div>
            <div className="mt-4">
                {
                    activity ? (
                        <PolyLocationSelector
                            initialCoords={(activity.targetField as Field).coords}
                            readOnly={true}
                            
                        ></PolyLocationSelector>

                    ) : (
                        <Loading />
                    )
                }
            </div>
        </div>
    </div>
);
};

export default ViewActivityPage;
