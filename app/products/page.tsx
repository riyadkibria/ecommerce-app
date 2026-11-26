export const instant = false;

import { getProducts } from "@/app/actions/products";
import ProductGrid from "@/components/products/ProductGrid";

export default async function ProductsPage() {

  const products = await getProducts();

  return (

    <main className="max-w-7xl mx-auto px-6 py-10">

      <header className="mb-8">

        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <p className="mt-2 text-gray-500">
          Browse our latest products.
        </p>

      </header>

      <ProductGrid
        products={products}
      />

    </main>

  );

}