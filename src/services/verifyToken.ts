import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}


export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('token-access');
    if (!token) {
        return res.status(401).json({ message: 'Acesso denegado'});
    }
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    req.userTokenId = payload._id;
    req.userTokenIat = payload.iat;
    req.userTokenExp = payload.exp;
    next();
}

export const getDataToken = (token: string) => {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    return payload;
}