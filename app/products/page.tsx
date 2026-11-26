export const instant = false;


type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default async function ProductsPage() {

  const response = await fetch(
    "https://dummyjson.com/products?limit=100"
  );

  const data = await response.json();

  const products: Product[] = data.products;

  return (

    <div className="p-8">

      <h1 className="mb-6 text-3xl font-bold">
        Products
      </h1>

      <div className="space-y-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="rounded-lg border p-4"
          >

            <img
              src={product.thumbnail}
              alt={product.title}
              className="mb-3 h-40 w-40 object-cover"
            />

            <h2 className="text-xl font-semibold">
              {product.title}
            </h2>

            <p className="text-gray-600">
              ${product.price}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}