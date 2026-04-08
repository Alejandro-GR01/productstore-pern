import { Router } from "express";
import * as productController from "../controllers/productController.ts";
import { authenticate } from "../middleware/auth.ts";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation.ts";
const router: Router = Router();

// GET /api/products => get all products(public)
router.get("/", productController.getAllProducts);

// GET /api/products/my => get current user's products (protected)
router.get("/my", authenticate, productController.getMyProducts);

// GET /api/products/:id => get single product by ID (public)
router.get("/:id", productController.getProductById);

// POST /api/products => Create new product (protected)
router.post(
  "/",
  authenticate,
  body("title").notEmpty().withMessage("The product title is required"),
  body("description")
    .notEmpty()
    .withMessage("The product description is required"),
  body("imageUrl").isURL().withMessage("Image URL don't valid"),
  handleInputErrors,
  productController.createProduct,
);

// PUT /api/products/:id - Update product (protected -owner only)
router.put(
  "/:id",
  authenticate,
  body("title").notEmpty().withMessage("The product title is required"),
  body("description")
    .notEmpty()
    .withMessage("The product description is required"),
  body("imageUrl").isURL().withMessage("Image URL don't valid"),
  handleInputErrors,
  productController.updateProductById,
);

// DELETE /api/products/:id -Delete product (protected - owner only)
router.delete(
  "/:id",
  authenticate,
  productController.deleteProductById,
);


export default router;
