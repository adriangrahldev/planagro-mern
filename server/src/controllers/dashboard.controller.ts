import { Request, Response } from 'express';
import Field from '../models/field.model';
import Activity from '../models/activity.model';


// Registrar un nuevo usuario
export async function getData(req: Request | any, res: Response): Promise<void> {
    try {
        const userId = req.user.userId;

        let fieldsCount = 0;
        let activitiesCount = 0;
        let nextActivities = [] as any;

        // Obtener campos
        const fields = await Field.find({ createdBy: userId });
        fieldsCount = fields.length;

        // Obtener actividades pendientes 
        for (const field of fields) {
            const activities = await Activity.find({ targetField: field._id }).populate('targetField');
            activitiesCount += activities.length;
            nextActivities.push(...activities);
        }

        res.json({ fieldsCount, activitiesCount, nextActivities });
    } catch (err) {
        res.status(500).json(err);
    }
}
