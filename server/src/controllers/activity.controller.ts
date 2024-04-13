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
    res.json(res.locals.activity);
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
    const activity = res.locals.activity;
    Object.assign(activity, req.body);
    try {
        const updatedActivity = await activity.save();
        res.json(updatedActivity);
    } catch (err) {
        res.status(400).json(err);
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
