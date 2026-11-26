import { fetchProducts } from "./dummyjson";

export async function getProducts() {

  const data = await fetchProducts();

  return data.products;

}