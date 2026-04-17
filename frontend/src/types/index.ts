export type  ProductData = Pick<Product, "title" | "description" | "imageUrl">;

export interface User {
  id: string;
  imageUrl: string;
  email: string;
  name: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userID: string;
  user?: User;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userID: string;
  productID: string;
  user?: User 
}

export interface Message {
  message: string
}
