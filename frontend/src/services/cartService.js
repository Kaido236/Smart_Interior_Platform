import apiClient from "./apiClient.js";

export function getCart() {
  return apiClient.get("/cart");
}

export function addToCart(productId, quantity = 1) {
  return apiClient.post("/cart/items", { productId, quantity });
}

export function updateCartItem(cartItemId, quantity) {
  return apiClient.put(`/cart/items/${cartItemId}`, { quantity });
}

export function removeCartItem(cartItemId) {
  return apiClient.delete(`/cart/items/${cartItemId}`);
}

export function clearCart() {
  return apiClient.delete("/cart");
}
