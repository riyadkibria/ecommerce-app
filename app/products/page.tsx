import { getProducts } from "@/app/actions/products";

import ProductGrid from "@/components/products/ProductGrid";



export default async function ProductsPage(){


  const products =
    await getProducts();



  return (

    <main className="
      max-w-7xl
      mx-auto
      p-6
    ">


      <h1 className="
        text-3xl
        font-bold
        mb-8
      ">
        Products
      </h1>



      <ProductGrid
        products={products}
      />


    </main>

  );

}