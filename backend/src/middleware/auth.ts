import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";
import { getUserById } from "../db/queries.ts";
import { ENV } from "../config/env.ts";
import { verifyJWT } from "../utils/jwt.ts";
import type { User } from "../db/schema.ts";

//Cambiando la interface de Request para agregar el campo user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("Unauthorized");
    return res.status(401).json({ error: error.message });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    const error = new Error("Unauthorized");
    return res.status(401).json({ error: error.message });
  }

  try {
    const result = verifyJWT(token);

    if (typeof result === "object" && result.id) {
      const user = await getUserById(result.id);

      if (!user) {
        const error = new Error("Usuer not found");
        return res.status(404).json({ error: error.message });
      }

      req.user = user;

      next();
    } else {
      return res.status(400).json({ error: "Token don't valid" });
    }
  } catch (error) {
    console.log("Authentication Error", error);
    return res.status(500).json({ error: "Authentication Error" });
  }
};
