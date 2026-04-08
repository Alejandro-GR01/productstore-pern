import { Router } from "express";
import { getUser } from "../controllers/index.ts";



const route: Router = Router();

route.get('/my', getUser  )

export default route