import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      external_id,
      name,
      description,
      price,
      discount_percentage,
      rating,
      stock,
      sku,
      availability_status,
      warranty_information,
      shipping_information,
      thumbnail,
      category_id,
      brand_id
    `)
    .order("created_at", {
      ascending: false,
    });

  if (error) {

    console.error(
      "Product fetch error:",
      error.message
    );

    return [];

  }

  return data as Product[];

}