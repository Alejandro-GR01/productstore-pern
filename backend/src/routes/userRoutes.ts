import { Router } from "express";
import { getUser } from "../controllers/index.ts";



const route: Router = Router();

route.post('/', getUser  )

export default route