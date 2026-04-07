import { Router } from "express";
import { loginUser, registerUser } from "../controllers/index.ts";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation.ts";

const route: Router = Router();

route.post(
  "/register",
  body("name").notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Email don't valid."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be over 8 characters."),
  handleInputErrors,
  registerUser,
);
route.post(
  "/login",
  body("email").isEmail().withMessage("Email dont't valid."),
  body("password")
    .notEmpty()
    .withMessage("Password required."),
  handleInputErrors,
  loginUser,
);

export default route;
