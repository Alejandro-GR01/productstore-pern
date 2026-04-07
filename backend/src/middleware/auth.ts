import jwt from 'jsonwebtoken';

import type { NextFunction, Request, Response } from "express";
import { getUserById } from '../db/queries.ts';
import { ENV } from '../config/env.ts';
import { verifyJWT } from '../utils/jwt.ts';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error("No Autorizado");
        return res.status(401).json({ error: error.message });
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        const error = new Error("No Autorizado");
        return res.status(401).json({ error: error.message });
    }

    try {
        const result = verifyJWT(token)
        if (typeof result === "object" && result.id) {
            const user = await getUserById(result.id)
            if (!user) {
                const error = new Error("Usuario no encontrado");
                return res.status(404).json({ error: error.message });
            }
            req.body.users = user
            next()
        }
    } catch (error) {

        return res.status(500).json({ error: "Token no valido" });
    }


}