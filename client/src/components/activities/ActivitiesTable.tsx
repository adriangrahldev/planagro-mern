import { Activity } from "@/interfaces/activity.interface";
import { Field } from "@/interfaces/field.interface";
import {
  ExclamationCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export const ActivitiesTable = ({
  activities,
  handleDelete,
  statusFilter,
}: {
  activities: Activity[];
  handleDelete: CallableFunction;
  statusFilter: string;
}) => {
  return (
    <table className="w-full text-left">
      <thead className="text-gray-500">
        <tr>
          <th className="p-2">Título</th>
          <th className="p-2">Descripción</th>
          <th className="p-2">Fecha</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Campo</th>
          <th className="p-2">Accciones</th>
        </tr>
      </thead>
      <tbody>
        {statusFilter === "pending" &&
          activities.filter((activity) => activity.status === "pending")
            .length === 0 && (
            <tr>
              <td colSpan={5} className="text-center border-t text-red-800">
                <div className="py-2">
                  <ExclamationCircleIcon
                    className="inline"
                    width={30}
                  ></ExclamationCircleIcon>{" "}
                  No hay actividades pendientes
                </div>
              </td>
            </tr>
          )}

        {statusFilter === "completed" &&
          activities.filter((activity) => activity.status === "completed")
            .length === 0 && (
            <tr>
              <td colSpan={5} className="text-center border-t text-red-800">
                <div className="py-2">
                  <ExclamationCircleIcon
                    className="inline"
                    width={30}
                  ></ExclamationCircleIcon>{" "}
                  No hay actividades completadas
                </div>
              </td>
            </tr>
          )}

          {
            statusFilter === "all" &&
            activities.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center border-t text-red-800">
                  <div className="py-2">
                    <ExclamationCircleIcon
                      className="inline"
                      width={30}
                    ></ExclamationCircleIcon>{" "}
                    No hay actividades registradas
                  </div>
                </td>
              </tr>
            )
          }

            {
                activities.map((activity, index) => {
                    if (activity.status === statusFilter.toString() || statusFilter === "all") {
                    return (

                        <tr key={index}>
                            <td className="p-2">{activity.title}</td>
                            <td className="p-2">{activity.description}</td>
                            <td className="p-2">
                            {new Date(
                                activity.date.split("T")[0] + " 12:00:00"
                            ).toLocaleDateString()}
                            </td>
                            <td className="p-2">
                            <span
                                className={`px-2 py-1 ${
                                activity.status === "pending"
                                    ? "bg-yellow-200 text-gray-600 "
                                    : "bg-green-400 text-white"
                                } text-sm font-semibold rounded-md shadow`}
                            >
                                {activity.status === "pending" ? "PENDIENTE" : "COMPLETADO"}
                            </span>
                            </td>
                            <td className="p-2">{(activity.targetField as Field)?.name}</td>
                            <td className="p-2">
                            <div className="flex gap-2">
                                <Link
                                href={`/dashboard/activities/${activity._id}/show`}
                                className="bg-green-400 p-2 rounded-full"
                                >
                                <EyeIcon className="h-4 w-4" />
                                </Link>
                                <Link
                                href={`/dashboard/activities/${activity._id}/edit`}
                                className="bg-green-200 p-2 rounded-full"
                                >
                                <PencilIcon className="h-4 w-4" />
                                </Link>
                                <button
                                onClick={(e) => {
                                    handleDelete(activity._id);
                                }}
                                className="p-2 border-green-200 border rounded-full"
                                >
                                <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                            </td>
                        </tr>
                    )
                }
                })
            }
        
      </tbody>
    </table>
  );
};
