import { Router } from "express";
import { getUser } from "../controllers/userController.ts";
import { authenticate } from "../middleware/auth.ts";



const route: Router = Router();

route.get('/my',authenticate,  getUser  )

export default route