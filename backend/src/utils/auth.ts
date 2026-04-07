import bcrypt from "bcrypt";
import { ENV } from "../config/env.ts";


export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(+ENV.BYCRYPT_SALT);
  return await bcrypt.hash(password, salt);
   
};

export const checkPassword = async (enteredPassword: string, hash: string) => {
  return await bcrypt.compare(enteredPassword, hash);

};