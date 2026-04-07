import jwt, {type  JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env.ts";

const jwt_expire = +ENV.JWT_EXPIRE;

export const generateJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: jwt_expire });
  return token;
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};
