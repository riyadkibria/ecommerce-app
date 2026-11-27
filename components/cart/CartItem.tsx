import Image from "next/image";

import {
  increaseCartItem,
  decreaseCartItem,
  removeCartItem,
} from "@/app/actions/cart/items";

type CartItemProps = {
  item: {
    id: string;
    quantity: number;
    unit_price: number;

    product: {
      id: string;
      name: string;
      thumbnail: string | null;
      price: number;
    };
  };
};

export default function CartItem({
  item,
}: CartItemProps) {
  const product = item.product;

  const itemTotal =
    item.unit_price * item.quantity;

  return (
    <div
      className="
        flex
        gap-4
        py-5
      "
    >
      {/* Image */}

      <div
        className="
          relative
          h-24
          w-24
          shrink-0
          overflow-hidden
          rounded-xl
          bg-gray-100
        "
      >
        <Image
          src={
            product.thumbnail ??
            "/images/placeholder.png"
          }
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Content */}

      <div
        className="
          flex
          flex-1
          flex-col
          justify-between
        "
      >
        <div>
          <h3
            className="
              text-sm
              font-semibold
            "
          >
            {product.name}
          </h3>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            ৳ {item.unit_price}
          </p>
        </div>

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
          "
        >
          {/* Quantity */}

          <div
            className="
              flex
              items-center
              overflow-hidden
              rounded-lg
              border
            "
          >
            {/* Decrease */}

            <form
              action={decreaseCartItem.bind(
                null,
                item.id
              )}
            >
              <button
                type="submit"
                className="
                  px-3
                  py-1
                  transition
                  hover:bg-gray-100
                "
              >
                -
              </button>
            </form>

            {/* Quantity */}

            <span
              className="
                px-4
                text-sm
                font-medium
              "
            >
              {item.quantity}
            </span>

            {/* Increase */}

            <form
              action={increaseCartItem.bind(
                null,
                item.id
              )}
            >
              <button
                type="submit"
                className="
                  px-3
                  py-1
                  transition
                  hover:bg-gray-100
                "
              >
                +
              </button>
            </form>
          </div>

          {/* Total */}

          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <span
              className="
                font-semibold
              "
            >
              ৳ {itemTotal}
            </span>

            {/* Remove */}

            <form
              action={removeCartItem.bind(
                null,
                item.id
              )}
            >
              <button
                type="submit"
                className="
                  text-sm
                  text-red-500
                  transition
                  hover:text-red-700
                "
              >
                Remove
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}