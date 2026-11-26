export interface Product {

  id: string;

  external_id: number;

  name: string;

  description: string | null;

  price: number;

  discount_percentage: number;

  rating: number;

  stock: number;

  sku: string | null;

  availability_status: string | null;

  warranty_information: string | null;

  shipping_information: string | null;

  thumbnail: string | null;

  category_id: string | null;

  brand_id: string | null;

}