const BASE_URL = "https://dummyjson.com";

export async function fetchProducts() {

  const response = await fetch(
    `${BASE_URL}/products?limit=100`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}