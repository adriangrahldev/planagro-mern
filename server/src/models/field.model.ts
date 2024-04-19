import { Schema, model, Document } from 'mongoose';

interface Field extends Document {
    name: string;
    surface: number;
    latitude: number;
    longitude: number;
    createdBy: Schema.Types.ObjectId | string; // Campo de referencia al usuario que creó el campo
}

const fieldSchema = new Schema<Field>({
    name: { type: String, required: true },
    surface: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default model<Field>('Field', fieldSchema);
