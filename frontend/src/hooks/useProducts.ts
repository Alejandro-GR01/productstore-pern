import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
} from "../api/api";
import { Product, User } from "../types";

export const useProducts = () => {
  const result = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: false,
  });
  return result;
};

export const useMyProducts = () => {
  const result = useQuery<Product[]>({
    queryKey: ["products", "my_products"],
    queryFn: getMyProducts,
    refetchOnWindowFocus: false,
  });

  return result;
};

export const useCreateProduct = () => {
  const result = useMutation({
    mutationFn: createProduct,
  });
  return result;
};

export const useProduct = (id: Product["id"]) => {
  const result = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return result;
};

export const useDeleteProduct = () => {
  const result = useMutation({
    mutationFn: deleteProduct,
  });
  return result;
};

export const useUpdateProduct = () => {
  const result = useMutation({
    mutationFn: updateProduct,
    
  });
  return result;
};
