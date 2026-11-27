import { getCart } from "@/app/actions/cart/cart";

export default async function CheckoutPage() {
  const cart = await getCart();

  if (cart.items.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

        <div className="mt-8 rounded-xl border p-10 text-center">
          <h2 className="text-xl font-semibold">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Add some products before checkout.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT */}

        <section className="lg:col-span-2">

          <div className="rounded-xl border bg-white p-6">

            <h2 className="mb-4 text-lg font-semibold">
              Shipping Information
            </h2>

            <p>
              Shipping form will go here...
            </p>

          </div>

        </section>

        {/* RIGHT */}

        <aside>

          <div className="rounded-xl border bg-white p-6">

            <h2 className="mb-5 text-lg font-semibold">
              Order Summary
            </h2>

            {cart.items.map((item) => (
              <div
                key={item.id}
                className="mb-3 flex justify-between"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>

                <span>
                  ৳
                  {(
                    item.unit_price *
                    item.quantity
                  ).toFixed(2)}
                </span>
              </div>
            ))}

            <hr className="my-5" />

            <div className="flex justify-between">

              <span>
                Subtotal
              </span>

              <span>
                ৳ {cart.total.toFixed(2)}
              </span>

            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}