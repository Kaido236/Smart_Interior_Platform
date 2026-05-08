import apiClient from "./apiClient.js";

export function checkout(payload) {
  return apiClient.post("/orders/checkout", payload);
}

export function getMyOrders() {
  return apiClient.get("/orders/my");
}

export function getOrderById(orderId) {
  return apiClient.get(`/orders/${orderId}`);
}

export function cancelOrder(orderId) {
  return apiClient.put(`/orders/${orderId}/cancel`, {});
}
