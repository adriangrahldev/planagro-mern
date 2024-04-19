import { Activity } from "@/interfaces/activity.interface";
import { Field } from "@/interfaces/field.interface";
import { ExclamationCircleIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const ActivitiesTable = ({activities, handleDelete}:{activities:Activity[], handleDelete: CallableFunction}) => {



    return (
        <table className="w-full text-left">
            <thead className="text-gray-500">
                <tr >
                    <th className="p-2">Título</th>
                    <th className="p-2">Descripción</th>
                    <th className="p-2">Fecha</th>
                    <th className="p-2">Estado</th>
                    <th className="p-2">Campo</th>
                    <th className="p-2">Accciones</th>
                </tr>
            </thead>
            <tbody>
                {activities.map((activity, index) => (
                    <tr key={index}>
                        <td className="py-2">{activity.title}</td>
                        <td className="py-2">{activity.description}</td>
                        <td className="py-2">
                            {new Date(activity.date.split("T")[0]+" 12:00:00").toLocaleDateString()}
                        </td>
                        <td className="py-2">
                            <span className={`px-2 py-1 text-gray-600 ${activity.status === 'pending' ? 'bg-yellow-200' : 'bg-green-400'} text-sm font-semibold rounded-md shadow`}>
                                {activity.status === 'pending' ? 'PENDIENTE' : 'COMPLETADO'}
                            </span>                        
                        </td>
                        <td className="py-2">{(activity.targetField as Field)?.name}</td>
                        <td className="py-2">
                            <div className="flex gap-2">

                                <Link href={`/dashboard/activities/${activity._id}/show`} className="bg-green-400 p-2 rounded-full">
                                    <EyeIcon className="h-4 w-4"/>
                                </Link>
                                <Link  href={`/dashboard/activities/${activity._id}/edit`} className="bg-green-200 p-2 rounded-full">
                                    <PencilIcon className="h-4 w-4"/>
                                </Link>
                                <button onClick={(e) => {handleDelete(activity._id)}} className="p-2 border-green-200 border rounded-full">
                                    <TrashIcon className="h-4 w-4"/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {
                    activities.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center border-t text-red-800"> 
                                <div className="py-2">
                                    <ExclamationCircleIcon className="inline" width={30}></ExclamationCircleIcon> No hay actividades registradas
                                </div>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}
