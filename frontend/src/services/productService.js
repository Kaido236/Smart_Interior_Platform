import mockProducts from "../data/mockProducts.js";

// These functions can later call a real backend API.
export function getProducts() {
  return mockProducts;
}

export function getProductById(productId) {
  return mockProducts.find((product) => product.id === productId);
}
