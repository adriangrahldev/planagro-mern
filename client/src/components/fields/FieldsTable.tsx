import { Field } from "@/interfaces/field.interface";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const FieldsTable = ({fields}:{fields:Field[]}) => {
    return (
        <table className="w-full text-left">
            <thead className="text-gray-500">
                <tr>
                    <th>Nombre</th>
                    <th>Superficie</th>
                    <th>Latitud</th>
                    <th>Longitud</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {fields.map((field, index) => (
                    <tr key={index}>
                        <td>{field.name}</td>
                        <td>{field.surface}</td>
                        <td>{field.latitude}</td>
                        <td>{field.longitude}</td>
                        <td>
                            <button className="text-blue-500">Editar</button>
                            <button className="text-red-500">Eliminar</button>
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
