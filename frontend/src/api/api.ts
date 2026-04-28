
import api from "../config/axios";
import { Comment, Message, Product, ProductData, User } from "../types";

// User API
export const getUser = async () => {
  const { data } = await api.get<User>("api/users/my");
  return data;
};

// Products API
export const getAllProducts = async () => {
  const { data } = await api.get<Product[]>("/api/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get<Product>(`/api/products/${id}`);
  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get<Product[]>("/api/products/my");
  return data;
};

export const createProduct = async (productData: ProductData) => {
  const { data } = await api.post<Product>("/api/products", productData);
  return data;
};

export const updateProduct = async ({
  id,
  productData
}: {
  id: string;
  productData: ProductData;
}) => {
  const { data } = await api.put<Product>(`/api/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete<Message>(`/api/products/${id}`);
  return data;
};

// Comments API
export const createComment = async ({
  productId,
  content,
}: {
  productId: string;
  content: string;
}) => {
  const { data } = await api.post<Comment>(`/api/comments/${productId}`, { content });
  return data;
};

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const { data } = await api.delete<Message>(`api/comments/${commentId}`);
  return data;
};
