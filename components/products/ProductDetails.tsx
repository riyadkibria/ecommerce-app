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
        mx-auto
        grid
        max-w-5xl
        items-start
        gap-8
        lg:grid-cols-[400px_minmax(0,1fr)]
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