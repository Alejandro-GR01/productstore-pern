import type { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/queries.ts";
import { checkPassword, hashPassword } from "../utils/auth.ts";
import { type NewUser } from "../db/schema.ts";

import { generateJWT } from "../utils/jwt.ts";
import generateUUID from "../utils/uuid.ts";

export async function registerUser(req: Request, res: Response) {
  const body = req.body;

  try {
    const existUser = await getUserByEmail(body.email);
    if (existUser) {
      return res.status(400).json({ error: `The email must be unique!` }).end();
    }
    const id = generateUUID();
    const passwordHash = await hashPassword(body.password);
    const data: NewUser = {
      ...req.body,
      passwordHash,
      id,
    };
    const { passwordHash: password, ...user } = await createUser(data);
    const token = generateJWT({ id: user.id });
    return res.status(201).send(token);
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ error: "Error registering user" });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const userEmail = await getUserByEmail(email);
    if (!userEmail) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasword = await checkPassword(password, userEmail.passwordHash);
    if (!isPasword) {
      return res
        .status(401)
        .json({ error: "The provided password does not match this user" });
    }
    const token = generateJWT({ id: userEmail.id });
    res.send(token);
  } catch (error) {
    console.log("Error login user", error);
    res.status(500).json({ error: "Error ligin user" });
  }
}
