import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não definido nas variáveis de ambiente.');
}

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const authenticateToken = (req:AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]

    if (!token) {
        return res.status(401).json({message: 'Token não fornecido'})
    }

    try{
        const decoded: any = jwt.verify(token, JWT_SECRET) as { id: number };
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: error})
    }
}
