// File: app/page.tsx

import Image from "next/image";
import Link from "next/link";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphone",
    price: "$129",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$249",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  },
  {
    id: 3,
    name: "Gaming Keyboard",
    price: "$89",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
  },
  {
    id: 4,
    name: "4K Monitor",
    price: "$399",
    image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=800&q=80",
  },
];

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Gaming",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* ================= Navbar ================= */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ShopHub
          </Link>

          <nav className="hidden gap-8 md:flex">
            <Link href="#" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Shop
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Categories
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Contact
            </Link>
          </nav>

          <div className="flex gap-3">
            <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
              Login
            </button>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Cart (0)
            </button>
          </div>
        </div>
      </header>

      {/* ================= Hero ================= */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="mb-3 text-blue-200 uppercase tracking-widest">
              New Collection 2026
            </p>

            <h1 className="mb-6 text-5xl font-bold leading-tight">
              Discover Amazing Products
            </h1>

            <p className="mb-8 text-lg text-blue-100">
              Shop premium electronics, fashion, home essentials, and gaming
              accessories at unbeatable prices.
            </p>

            <div className="flex gap-4">
              <button className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-gray-100">
                Shop Now
              </button>

              <button className="rounded-xl border border-white px-6 py-3 hover:bg-white hover:text-blue-700">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80"
              alt="Hero"
              width={550}
              height={550}
              className="rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ================= Categories ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold">Shop by Category</h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded-2xl bg-white p-8 text-center shadow transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Featured Products ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Featured Products
          </h2>

          <Link href="#" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-xl font-semibold">
                  {product.name}
                </h3>

                <p className="mb-4 text-lg font-bold text-blue-600">
                  {product.price}
                </p>

                <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= Promotion ================= */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Big Sale Up To 50% Off
          </h2>

          <p className="mb-8 text-lg">
            Limited time offer on selected products.
          </p>

          <button className="rounded-xl bg-white px-8 py-3 font-semibold text-blue-600 hover:bg-gray-100">
            Shop Deals
          </button>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <footer className="bg-gray-900 py-10 text-gray-300">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <h3 className="text-2xl font-bold text-white">
            ShopHub
          </h3>

          <p>© 2026 ShopHub. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Support</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}