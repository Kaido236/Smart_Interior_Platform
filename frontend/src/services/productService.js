import apiClient from "./apiClient.js";

export function getProducts(params = {}) {
  return apiClient.get("/products", params);
}

export function getProductById(productId) {
  return apiClient.get(`/products/${productId}`);
}

export function createProduct(payload) {
  return apiClient.post("/products", payload);
}

export function updateProduct(productId, payload) {
  return apiClient.put(`/products/${productId}`, payload);
}

export function deleteProduct(productId) {
  return apiClient.delete(`/products/${productId}`);
}

export function getMyProducts() {
  return apiClient.get("/products/my");
}
