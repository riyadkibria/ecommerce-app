import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/product";

const PRODUCT_SELECT = `
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
`;


// ==========================================
// Get All Products
// ==========================================

export async function getProducts(): Promise<Product[]> {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
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


// ==========================================
// Get Single Product
// ==========================================

export async function getProductById(
  id: string
): Promise<Product | null> {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .single();

  if (error) {

    console.error(
      "Product fetch error:",
      error.message
    );

    return null;

  }

  return data as Product;

}