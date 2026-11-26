import type { Product } from "@/types/product";

import AddToCartButton from "./AddToCartButton";

type ProductInfoProps = {
  product: Product;
};

export default function ProductInfo({
  product,
}: ProductInfoProps) {

  return (

    <div className="space-y-6">

      {/* Product Name */}
      <div>

        <h1 className="text-4xl font-bold">
          {product.name}
        </h1>

      </div>

      {/* Rating */}

      <div className="text-yellow-500 text-lg">

        ⭐ {product.rating}

      </div>

      {/* Price */}

      <div>

        <p className="text-3xl font-bold">

          ${product.price}

        </p>

      </div>

      {/* Stock */}

      <div>

        <p className="font-medium">

          Stock: {product.stock}

        </p>

      </div>

      {/* Description */}

      <div>

        <h2 className="text-lg font-semibold mb-2">

          Description

        </h2>

        <p className="text-gray-600">

          {product.description}

        </p>

      </div>

      {/* Add To Cart */}

      <AddToCartButton
        productId={product.id}
      />

    </div>

  );

}