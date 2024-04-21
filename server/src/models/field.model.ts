import { Schema, model, Document } from 'mongoose';

interface Field extends Document {
    name: string;
    surface: number;
    coords: Schema.Types.Array;
    createdBy: Schema.Types.ObjectId | string; // Campo de referencia al usuario que creó el campo
}

const fieldSchema = new Schema<Field>({
    name: { type: String, required: true },
    surface: { type: Number, required: true },
    coords: { type: Schema.Types.Array, required: true }, // Change the type to Schema.Types.Array
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},{timestamps: true});

export default model<Field>('Field', fieldSchema);
