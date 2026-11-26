export const instant = false;

import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export default async function ProductsPage() {

  const products = await getProducts();

  return (

    <div className="p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Products
      </h1>

      <div className="space-y-6">

        {products.map((product: any) => (

          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
          />

        ))}

      </div>

    </div>

  );

}