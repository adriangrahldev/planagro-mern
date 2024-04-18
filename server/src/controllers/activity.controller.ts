import { Request, Response } from 'express';
import Activity from '../models/activity.model';

// Obtener todas las actividades
export async function getAllActivities(req: Request, res: Response): Promise<void> {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Obtener una actividad por ID
export async function getActivityById(req: Request, res: Response): Promise<void> {
    const activity = await Activity.findById(req.params.id);
    res.status(200).json(activity);
}

// Crear nueva actividad
export async function createActivity(req: Request, res: Response): Promise<void> {
    const activity = new Activity(req.body);
    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Actualizar una actividad existente por ID
export async function updateActivity(req: Request, res: Response): Promise<void> {
    try {
        const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!activity) {
            res.status(404).json();
        }
        res.status(200).json(activity);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Eliminar una actividad existente opor ID
export async function deleteActivity(req: Request, res: Response): Promise<void> {
    const activity = res.locals.activity;
    try {
        await activity.remove();
        res.json({ message: 'Deleted activity' });
    } catch (err) {
        res.status(500).json(err);
    }
}
