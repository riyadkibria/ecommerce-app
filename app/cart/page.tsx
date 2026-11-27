import { getCart } from "@/app/actions/cart/cart";

import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default async function CartPage() {
  const cart = await getCart();

  return (
    <main
      className="
        mx-auto
        max-w-6xl
        px-6
        py-10
      "
    >
      {/* Header */}

      <header
        className="
          mb-8
        "
      >
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Shopping Cart
        </h1>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Review your items before checkout.
        </p>
      </header>

      {cart.items.length === 0 ? (
        <div
          className="
            rounded-xl
            border
            p-10
            text-center
          "
        >
          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Your cart is empty
          </h2>

          <p
            className="
              mt-2
              text-gray-500
            "
          >
            Add products to start shopping.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            gap-8
            lg:grid-cols-3
          "
        >
          {/* Cart Items */}

          <section
            className="
              rounded-xl
              border
              bg-white
              p-5
              lg:col-span-2
            "
          >
            <h2
              className="
                mb-4
                text-lg
                font-semibold
              "
            >
              Cart Items
            </h2>

            <div
              className="
                divide-y
              "
            >
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </section>

          {/* Summary */}

          <aside>
            <CartSummary
              total={cart.total}
              itemCount={cart.items.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
            />
          </aside>
        </div>
      )}
    </main>
  );
}