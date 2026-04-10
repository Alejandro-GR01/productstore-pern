import jwt, { type JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env.ts";

const jwt_expire = +ENV.JWT_EXPIRE;

export const generateJWT = (payload: { id: string }) => {
  const token = jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: jwt_expire });
  return token;
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string };
    if (!decoded.id) throw new Error("Invalid token payload");
    return decoded;
  } catch (error) {
    console.log("Error verifying JWT", error);
    throw new Error("Invalid token");
  }
};
