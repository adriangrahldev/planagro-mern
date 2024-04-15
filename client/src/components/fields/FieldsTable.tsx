import { Field } from "@/interfaces/field.interface";

export const FieldsTable = ({fields}:{fields:Field[]}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surface</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Created By</th>
                </tr>
            </thead>
            <tbody>
                {fields.map((field, index) => (
                    <tr key={index}>
                        <td>{field.name}</td>
                        <td>{field.surface}</td>
                        <td>{field.latitude}</td>
                        <td>{field.longitude}</td>
                        <td>{field.createdBy}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
