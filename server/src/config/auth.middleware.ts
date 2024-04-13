import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export function authenticateToken(req: Request | any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'PlanAgroSecret', (err:any, decodedToken: any) => {
        if (err) return res.sendStatus(403);
        req.user = { userId: decodedToken._id }; // Almacena la información del usuario decodificada en el objeto de solicitud        
        next();
    });
}
