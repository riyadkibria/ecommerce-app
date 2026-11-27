"use client";

import { useRouter } from "next/navigation";

type CartSummaryProps = {
  total: number;
  itemCount: number;
};

export default function CartSummary({
  total,
  itemCount,
}: CartSummaryProps) {
  const router = useRouter();

  const shipping =
    total >= 1000 ? 0 : 60;

  const grandTotal =
    total + shipping;

  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-5
        space-y-5
      "
    >
      <h2
        className="
          text-lg
          font-semibold
        "
      >
        Order Summary
      </h2>

      {/* Items */}

      <div
        className="
          flex
          justify-between
          text-sm
          text-gray-600
        "
      >
        <span>
          Items ({itemCount})
        </span>

        <span>
          ৳ {total.toFixed(2)}
        </span>
      </div>

      {/* Shipping */}

      <div
        className="
          flex
          justify-between
          text-sm
          text-gray-600
        "
      >
        <span>
          Shipping
        </span>

        <span>
          {shipping === 0
            ? "Free"
            : `৳ ${shipping}`}
        </span>
      </div>

      {/* Total */}

      <div
        className="
          flex
          justify-between
          border-t
          pt-4
          font-semibold
        "
      >
        <span>
          Total
        </span>

        <span>
          ৳ {grandTotal.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}

      <button
        type="button"
        onClick={() =>
          router.push("/checkout")
        }
        className="
          w-full
          rounded-lg
          bg-black
          py-3
          text-sm
          font-medium
          text-white
          transition
          hover:bg-gray-800
          active:scale-[0.98]
        "
      >
        Proceed to Checkout
      </button>
    </div>
  );
}