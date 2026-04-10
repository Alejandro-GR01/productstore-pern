import type { Request, Response } from "express";


export async function getUser(req: Request, res: Response) {
  if (req.user) {
    const {passwordHash, ...user} = req.user
    return res.json({...user}) ;
  }
  return res.status(401).json({error: 'Unauthorized'})
}
