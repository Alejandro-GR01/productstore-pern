import api from "../config/axios";

//User API
export const getUser = async () => {
  console.log("Getting user data...");
  const { data } = await api.get("api/users/my");
  console.log(data)
  return data;
};

//Products API
export const getAllProducts = async () => {
  const { data } = await api.get("/api/products");
  return data;
};

export const getProductById = async (id) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data;
};

export const getMyProducts = async () => {
  const { data } = await api.get("/api/products/my");
  return data;
};

export const createProduct = async (productData) => {
  const { data } = await api.post("/api/products", productData);
  return data;
};

export const updateProduct = async ({ id, ...productData }) => {
  const { data } = await api.put(`/api/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/api/products/${id}`);
  return data;
};


// Comments API
export const createComment = async ({productId, content})=> {
    const {data} = await api.post(`/api/comments/${productId}`, {content});
    return data;
};

export const deleteComment = async ({commentId})=> {
    const {data} = await api.delete(`api/comments/${commentId}`);
    return data;
}