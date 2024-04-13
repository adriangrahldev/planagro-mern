import { Schema, model, Document } from 'mongoose';
import Field  from './field.model';

interface Activity extends Document {
    title: string;
    description: string;
    date: Date;
    status: 'pending' | 'completed';
    targetField: Schema.Types.ObjectId | string;
}

const activitySchema = new Schema<Activity>({
    title: String,
    description: String,
    date: Date,
    status: { type: String, enum: ['pending', 'completed'] },
    targetField: { type: Schema.Types.ObjectId, ref: 'Field' }
});

export default model<Activity>('Activity', activitySchema);