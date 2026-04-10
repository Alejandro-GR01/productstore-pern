import type { Request, Response } from "express";
import { getUserById } from "../db/queries.ts";

export async function getUser(req: Request, res: Response) {
  if (req.user) {
    const {passwordHash, ...user} = req.user
    return res.json({user}) ;
  }
  return res.status(401).json({error: 'Unauthorized'})
}
