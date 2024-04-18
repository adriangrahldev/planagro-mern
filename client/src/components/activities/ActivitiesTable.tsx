import { Activity } from "@/interfaces/activity.interface";
import { Field } from "@/interfaces/field.interface";
import { ExclamationCircleIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const ActivitiesTable = ({activities}:{activities:Activity[]}) => {


    const handleDelete = (id: string) => {
        console.log(`Deleting activity with id: ${id}`);
    }


    return (
        <table className="w-full text-left">
            <thead className="text-gray-500">
                <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Campo</th>
                    <th>Accciones</th>
                </tr>
            </thead>
            <tbody>
                {activities.map((activity, index) => (
                    <tr key={index}>
                        <td>{activity.title}</td>
                        <td>{activity.description}</td>
                        <td>
                            {new Date(activity.date.split("T")[0]+" 12:00:00").toLocaleDateString()}
                        </td>
                        <td>
                            <span className={`px-2 py-1 text-gray-600 ${activity.status === 'pending' ? 'bg-yellow-200' : 'bg-green-400'} text-sm font-semibold rounded-md shadow`}>
                                {activity.status === 'pending' ? 'PENDIENTE' : 'COMPLETADO'}
                            </span>                        
                        </td>
                        <td>{(activity.targetField as Field)?.name}</td>
                        <td>
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
