import type { Request, Response } from "express";
import * as queries from "../db/queries.ts";
import generateUUID from "../utils/uuid.ts";

export async function createComment(req: Request, res: Response) {
  try {
    const productID = req.params.productId as string;
    const existProduct = await queries.getProductById(productID);
    if (!existProduct)
      return res.status(404).json({ error: "Product not found" });
    const userID = req.user.id;
    const content = req.body.content as string;
    const comment = await queries.createComment({
      content: content,
      userID,
      productID,
      id: generateUUID(),
    });
    return res.status(201).json(comment);
  } catch (error) {
    console.log("Error ccreating a comment", error);
    return res.status(500).json({ error: "Failed to create a comment" });
  }
}
export async function deleteComment(req: Request, res: Response) {
    try{

        const commentId = req.params.commentId as string;
        const exisitingComment = await queries.getCommentById(commentId);
        if (!exisitingComment) return res.status(404).json({ error: "" });
        const userID = req.user.id;
        if (exisitingComment.userID !== userID)
          return res
            .status(403)
            .json({ error: "You can only delete your own comments" });
      
        await queries.deleteComment(commentId);
        res.status(200).json({message: "Comment deleted successfully"})
    }catch (error) {
    console.log("Error deleting  comment", error);
    return res.status(500).json({ error: "Failed to delete comment" });
  }
}
