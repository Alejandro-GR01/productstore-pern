import type { Request, Response } from "express";
import * as queries from "../db/queries.ts";
import type { NewProduct, User } from "../db/schema.ts";
import generateUUID from "../utils/uuid.ts";

// Get all products (public)
export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await queries.getAllProducts();
    return res.status(200).json(products);
  } catch (e) {
    console.log("Error getting products", e);
    const error = new Error("Failed to get products");

    res.status(500).json({ error: error.message });
  }
}

// Get products by current user (protected)
export async function getMyProducts(req: Request, res: Response) {
  try {
    const userId: User["id"] = req.user.id!;
    const products = await queries.getProductsByUserId(userId);
   return  res.status(200).json(products);
  } catch (e) {
    console.log("Error getting user products", e);
    res.status(500).json({ error: "Failed to get user products" });
  }
}

// Get single product by ID (public)
export async function getProductById(req: Request, res: Response) {
  try {
    const id   = req.params.id! as string;

    const product = await queries.getProductById(id);

    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.status(200).json(product);
  } catch (e) {
    console.log("Error getting product by ID", e);
    const error = new Error("Failed to get product");

    res.status(500).json({ error: error.message });
  }
}

// Create product (protected)
export async function createProduct(req: Request, res: Response) {
  try {
    const userID: User["id"] = req.user.id!;
    console.log(userID);
    const product: Pick<NewProduct, "title" | "description" | "imageUrl"> = req.body;
    console.log(product)
    const id = generateUUID();

    const productCreated = await queries.createProduct({
      title: product.title,
      description: product.description,
      imageUrl: product.imageUrl,
      userID: userID,
      id: id,
    });



     return res.status(201).json(productCreated);
  } catch (e) {
    console.log("Error creating product", e);
    const error = new Error("Failed to create product");

    res.status(500).json({ error: error.message });
  }
}

// Update  product by id (protected)
export async function updateProductById(req: Request, res: Response) {
  try {
    const userID: User["id"] = req.user.id!;
    const id = req.params.id as string;
    const { title, description, imageUrl } = req.body;
    const exisitingProduct = await queries.getProductById(id);
    if (!exisitingProduct)
      return res.status(404).json({ error: "Product not found" });
    if (exisitingProduct.userID !== userID)
      res.status(403).json({ error: "You can only update your own products" });

    const product = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
    });
    return res.status(201).json(product);
  } catch (e) {
    console.log("Error updating product by ID", e);
    const error = new Error("Failed to update product");

    res.status(500).json({ error: error.message });
  }
}

// Delete a product by id (protected)
export async function deleteProductById(req: Request, res: Response) {
  try {
    const userID: User["id"] = req.user.id!;
    const id = req.params.id as string;
    const exisitingProduct = await queries.getProductById(id);
    if (!exisitingProduct)
      return res.status(404).json({ error: "Product not found" });
    if (exisitingProduct.userID !== userID)
      res.status(403).json({ error: "You can only update your own products" });

    await queries.deleteProduct(id);
    return res.status(200).json({ message: "Product deleted succesfully" });
  } catch (e) {
    console.log("Error deleting product by ID", e);
    const error = new Error("Failed to delete product");

    res.status(500).json({ error: error.message });
  }
}
