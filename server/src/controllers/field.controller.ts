import { Request, Response } from 'express';
import Field from '../models/field.model';

// Ontener todos los campos
export async function getAllFields(req: Request|any, res: Response): Promise<void> {
    const user = req.user;
    
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
        const field = await Field.findOne({_id: req.params.id});
        res.json(field);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Crear una nuevo campo
export async function createField(req: Request|any, res: Response): Promise<void> {
    const user = req.user;

    const field = new Field(req.body);
    field.createdBy = user.userId;
    try {
        const newField = await field.save();
        res.status(201).json(newField);
    } catch (err) {
        res.status(400).json(err);
    }
}
// Actualizar un campo existente por ID
export async function updateField(req: Request, res: Response): Promise<void> {
    try {
        const field = await Field.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!field) {
            res.status(404).json();
        }
        res.status(200).json(field);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Eliminar un campo existente por ID
export async function deleteField(req: Request, res: Response): Promise<void> {

    const field = await Field.findByIdAndDelete(req.params.id);
    if (!field) {
        res.status(404).json();
    }
    res.status(200).json(field);

}
