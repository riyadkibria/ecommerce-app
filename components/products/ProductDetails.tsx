import type { Product } from "@/types/product";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({
  product,
}: ProductDetailsProps) {

  return (

    <section
      className="
        grid
        gap-10
        lg:grid-cols-2
      "
    >

      <ProductGallery
        product={product}
      />

      <ProductInfo
        product={product}
      />

    </section>

  );

}