import { Router } from "express";
import { getUser } from "../controllers/userController.ts";



const route: Router = Router();

route.get('/my', getUser  )

export default route