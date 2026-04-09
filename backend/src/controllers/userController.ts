import type { Request, Response } from "express";
import { getUserById } from "../db/queries.ts";

export async function getUser(req: Request, res: Response) {
  if (req.user.id) {
    const {passwordHash, ...user} = await getUserById(req.user.id);
    return user;
  }
}
