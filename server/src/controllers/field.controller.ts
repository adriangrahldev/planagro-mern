import { Request, Response } from 'express';
import Field from '../models/field.model';

// Ontener todos los campos
export async function getAllFields(req: Request|any, res: Response): Promise<void> {
    const user = req.user;
    console.log(user);
    
    try {
        const fields = await Field.find({createdBy: user.userId});
        res.json(fields);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Obtener un campo por ID
export async function getFieldById(req: Request, res: Response): Promise<void> {
    try {
        const field = await Field.findOne({_id: req.params._id});
        res.json(field);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Crear una nuevo campo
export async function createField(req: Request, res: Response): Promise<void> {
    const field = new Field(req.body);
    try {
        const newField = await field.save();
        res.status(201).json(newField);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Actualizar un campo existente por ID
export async function updateField(req: Request, res: Response): Promise<void> {
    const field = res.locals.field;
    Object.assign(field, req.body);
    try {
        const updatedField = await field.save();
        res.json(updatedField);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Eliminar un campo existente por ID
export async function deleteField(req: Request, res: Response): Promise<void> {
    const field = res.locals.field;
    try {
        await field.remove();
        res.json({ message: 'Deleted field' });
    } catch (err) {
        res.status(500).json(err);
    }
}
