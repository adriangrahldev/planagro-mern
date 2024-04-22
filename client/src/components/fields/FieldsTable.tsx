import { Field } from "@/interfaces/field.interface";
import { ExclamationCircleIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const FieldsTable = ({fields, handleDelete}:{fields:Field[], handleDelete: CallableFunction}) => {



    return (
        <table className="w-full text-left">
            <thead className="text-gray-500">
                <tr>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Superficie</th>
                    <th className="p-2">Fecha de creación</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {fields.map((field, index) => (
                    <tr key={index}>
                        <td className="p-2">{field.name}</td>
                        <td className="p-2">{field.surface}</td>
                        <td className="p-2">{new Date(field.createdAt).toLocaleDateString()}</td>
                        <td className="p-2">
                            <div className="flex gap-2">

                                <Link href={`/dashboard/fields/${field._id}/show`} className="bg-green-400 p-2 rounded-full">
                                    <EyeIcon className="h-4 w-4"/>
                                </Link>
                                <Link  href={`/dashboard/fields/${field._id}/edit`} className="bg-green-200 p-2 rounded-full">
                                    <PencilIcon className="h-4 w-4"/>
                                </Link>
                                <button onClick={(e) => {handleDelete(field._id)}} className="p-2 border-green-200 border rounded-full">
                                    <TrashIcon className="h-4 w-4"/>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                {
                    fields.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center border-t text-red-800"> 
                                <div className="py-2">
                                    <ExclamationCircleIcon className="inline" width={30}></ExclamationCircleIcon> No hay campos registrados
                                </div>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}
