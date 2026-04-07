import type { Request, Response } from "express";
import { getUserById } from "../db/queries.ts";

export async function getUser(req: Request, res: Response) {
  if (req.body.id) {
    const user = await getUserById(req.body.id);
    return user;
  }
}
