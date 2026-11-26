export const instant = false;

import { notFound } from "next/navigation";

import { getProductById } from "@/app/actions/products";

import ProductDetails from "@/components/products/ProductDetails";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: PageProps) {

  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <ProductDetails product={product} />
    </main>
  );

}