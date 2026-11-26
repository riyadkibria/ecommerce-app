"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
  rating: number;
  stock: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = () => {
    if (outOfStock || status !== "idle") return;
    setStatus("loading");

    // TODO: replace with your real add-to-cart logic (API call / store action)
    setTimeout(() => {
      setStatus("added");
      setTimeout(() => setStatus("idle"), 1800);
    }, 700);
  };

  return (
    <div className="group rounded-2xl border border-stone-200 bg-white p-3 transition-shadow duration-300 hover:shadow-[0_12px_40px_-16px_rgba(28,25,23,0.25)] dark:border-stone-800 dark:bg-stone-900">
      {/* Image */}
      <div className="overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800">
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-48 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>

      {/* Info */}
      <div className="space-y-4 px-1 pb-1 pt-4">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-1 text-[15px] font-medium tracking-tight text-stone-900 dark:text-stone-50">
              {product.name}
            </h2>
            <p className="flex shrink-0 items-center gap-1 text-sm text-stone-600 dark:text-stone-400">
              <span aria-hidden="true" className="text-stone-400">
                ★
              </span>
              {product.rating}
            </p>
          </div>

          <div className="flex items-baseline justify-between">
            <p className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50">
              ${product.price}
            </p>

            <p
              className={`text-xs ${
                outOfStock
                  ? "text-stone-400 dark:text-stone-500"
                  : lowStock
                  ? "text-amber-800/80 dark:text-amber-300/80"
                  : "text-stone-500 dark:text-stone-400"
              }`}
            >
              Stock: {product.stock}
            </p>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          aria-live="polite"
          className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-stone-900 px-4 py-3 text-sm font-medium text-stone-50 transition-all duration-300 hover:bg-stone-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200 dark:focus-visible:ring-stone-50 dark:focus-visible:ring-offset-stone-900 dark:disabled:bg-stone-800 dark:disabled:text-stone-500"
        >
          {outOfStock && <span>Out of stock</span>}

          {!outOfStock && status === "idle" && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M6 7h12l-1 13H7L6 7Z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              <span>Add to cart</span>
            </>
          )}

          {status === "loading" && (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
                />
              </svg>
              <span>Adding</span>
            </>
          )}

          {status === "added" && (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>Added to cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}