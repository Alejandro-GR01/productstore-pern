import { Router } from "express";
import * as commentController from "../controllers/commentController.ts";
import { authenticate } from "../middleware/auth.ts";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation.ts";

const router: Router = Router();

// POST /api/comments/:productId - Add comment to product (protected)
router.post(
  "/:productId",
  authenticate,
  body("content").notEmpty().withMessage("The content comment is required"),
  handleInputErrors,
  commentController.createComment,
);

// DELETE /api/comments/:commentId - Delete comment (protected -owner only)
router.delete("/:commentId", authenticate, commentController.deleteComment);

export default router;
