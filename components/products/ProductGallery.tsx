import Image from "next/image";

import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export default function ProductGallery({
  product,
}: ProductGalleryProps) {

  return (

    <div
      className="
        w-full
        max-w-[420px]
        lg:sticky
        lg:top-24
      "
    >

      <div
        className="
          relative
          aspect-square
          overflow-hidden
          rounded-2xl
          border
          border-stone-200
          bg-stone-50
          shadow-sm
          dark:border-stone-800
          dark:bg-stone-900
        "
      >

        <Image
          src={
            product.thumbnail ??
            "/images/placeholder.png"
          }
          alt={product.name}
          fill
          priority
          sizes="420px"
          className="
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />

      </div>

    </div>

  );

}