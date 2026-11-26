"use server";


import { createClient } from "@/lib/supabase/server";
import { getOrCreateCart } from "./cart";



export async function addToCart(
  productId: string
) {


  const supabase =
    await createClient();



  const cart =
    await getOrCreateCart();




  // Get product

  const {
    data: product,
    error: productError

  } =
  await supabase
    .from("products")
    .select(
      `
      id,
      price,
      stock
      `
    )
    .eq(
      "id",
      productId
    )
    .single();




  if(productError || !product){

    throw new Error(
      "Product not found"
    );

  }




  if(product.stock <= 0){

    throw new Error(
      "Out of stock"
    );

  }





  // Check existing item

  const {
    data:item

  } =
  await supabase
    .from("cart_items")
    .select("*")
    .eq(
      "cart_id",
      cart.id
    )
    .eq(
      "product_id",
      productId
    )
    .maybeSingle();






  // Already exists

  if(item){


    const newQuantity =
      item.quantity + 1;



    if(newQuantity > product.stock){

      throw new Error(
        "Not enough stock"
      );

    }



    const {
      error:updateError

    }
    =
    await supabase
      .from("cart_items")
      .update({

        quantity:
          newQuantity

      })
      .eq(
        "id",
        item.id
      );




    if(updateError){

      throw new Error(
        updateError.message
      );

    }



    return {

      success:true,

      message:
        "Cart updated"

    };


  }







  // New item


  const {
    error:insertError

  }
  =
  await supabase
    .from("cart_items")
    .insert({

      cart_id:
        cart.id,


      product_id:
        product.id,


      quantity:1,


      unit_price:
        product.price

    });





  if(insertError){

    throw new Error(
      insertError.message
    );

  }




  return {

    success:true,

    message:
      "Added to cart"

  };


}