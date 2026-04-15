import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "../api/api";
import { Product } from "../../../backend/src/db/schema";

export const useProducts = () => {
  const result = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return result;
};

export const useCreateProduct = () => {
  const result = useMutation({
    mutationFn: createProduct,
  });
  return result;
};
