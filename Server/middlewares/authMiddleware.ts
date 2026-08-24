import jwt from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';
import { type extRequest } from '../../definitions.ts';


export const authMiddleware = (req: extRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = decoded.userId
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}