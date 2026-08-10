import jwt, { type SignOptions } from 'jsonwebtoken';
import { type Response } from 'express'

export const generateToken = (userId: string, res: Response) => {
    const payload = {userId: userId}
    const token: string = jwt.sign
    (
        payload, 
        process.env.JWT_SECRET as string, 
        {
        expiresIn: process.env.JWT_EXPIRES as SignOptions['expiresIn']
        }
    )
    res.cookie(
        "jwt",
        token,
        {httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }
        
    )
    return token;
}