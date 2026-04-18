import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../api/api";
import { Product } from "../../../backend/src/db/schema";

export const useProducts = () => {
  const result = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnWindowFocus: false
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
    refetchOnWindowFocus: false
  });

  return result;
};

export const useDeleteProduct = () => {
  const result = useMutation({
    mutationFn: deleteProduct,
  });
  return result;
};
