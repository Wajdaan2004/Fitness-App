import jwt from 'jsonwebtoken';
import { Router, type Request, type Response } from 'express';

const router = Router();

const authMiddleware = async (req: Request, res: Response, next: () => void) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
    if (decoded) {
        next();
    }
    })
}