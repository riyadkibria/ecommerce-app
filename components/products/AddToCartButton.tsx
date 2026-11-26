"use client";

type AddToCartButtonProps = {
  productId: string;
};

export default function AddToCartButton({
  productId,
}: AddToCartButtonProps) {

  function handleClick() {

    console.log(
      "Add To Cart:",
      productId
    );

  }

  return (

    <button
      onClick={handleClick}
      className="
        rounded-lg
        bg-black
        px-6
        py-3
        font-medium
        text-white
        transition
        hover:bg-gray-800
      "
    >

      Add To Cart

    </button>

  );

}