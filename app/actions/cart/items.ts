"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getOrCreateCart } from "./cart";


// =====================================
// ADD TO CART
// =====================================

export async function addToCart(
  productId: string
): Promise<void> {

  const supabase = await createClient();


  const cart = await getOrCreateCart();


  if (!cart?.id) {
    throw new Error("Cart creation failed");
  }



  const {
    data: product,
    error: productError,
  } =
    await supabase
      .from("products")
      .select(`
        id,
        price,
        stock
      `)
      .eq("id", productId)
      .single();



  if (productError || !product) {
    throw new Error("Product not found");
  }



  if (product.stock <= 0) {
    throw new Error("Out of stock");
  }




  const {
    data: existingItem,
    error: itemError,
  } =
    await supabase
      .from("cart_items")
      .select(`
        id,
        quantity
      `)
      .eq("cart_id", cart.id)
      .eq("product_id", productId)
      .maybeSingle();



  if (itemError) {
    throw new Error(itemError.message);
  }





  // Existing item

  if (existingItem) {


    const newQuantity =
      existingItem.quantity + 1;



    if (newQuantity > product.stock) {
      throw new Error("Not enough stock");
    }



    const {
      error
    } =
      await supabase
        .from("cart_items")
        .update({
          quantity: newQuantity
        })
        .eq(
          "id",
          existingItem.id
        );



    if (error) {
      throw new Error(error.message);
    }


  }



  // New item

  else {


    const {
      error
    } =
      await supabase
        .from("cart_items")
        .insert({

          cart_id: cart.id,

          product_id: product.id,

          quantity: 1,

          unit_price: product.price

        });



    if (error) {
      throw new Error(error.message);
    }

  }



  revalidatePath("/cart");

}





// =====================================
// UPDATE QUANTITY
// =====================================

export async function updateCartQuantity(
  itemId: string,
  quantity: number
): Promise<void> {


  if (quantity <= 0) {

    await removeCartItem(itemId);

    return;
  }



  const supabase =
    await createClient();




  const {
    data:item,
    error:itemError
  }
  =
  await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      product_id
    `)
    .eq(
      "id",
      itemId
    )
    .single();



  if(itemError || !item){

    throw new Error(
      "Cart item not found"
    );

  }





  const {
    data:product,
    error:productError
  }
  =
  await supabase
    .from("products")
    .select("stock")
    .eq(
      "id",
      item.product_id
    )
    .single();



  if(productError || !product){

    throw new Error(
      "Product not found"
    );

  }





  if(quantity > product.stock){

    throw new Error(
      "Not enough stock"
    );

  }





  const {
    error
  }
  =
  await supabase
    .from("cart_items")
    .update({
      quantity
    })
    .eq(
      "id",
      itemId
    );



  if(error){

    throw new Error(
      error.message
    );

  }



  revalidatePath("/cart");

}







// =====================================
// INCREASE
// =====================================

export async function increaseCartItem(
  itemId:string
):Promise<void>{


  const supabase =
    await createClient();



  const {
    data:item,
    error
  }
  =
  await supabase
    .from("cart_items")
    .select(`
      quantity,
      product_id
    `)
    .eq(
      "id",
      itemId
    )
    .single();



  if(error || !item){

    throw new Error(
      "Cart item not found"
    );

  }




  await updateCartQuantity(
    itemId,
    item.quantity + 1
  );


}







// =====================================
// DECREASE
// =====================================

export async function decreaseCartItem(
  itemId:string
):Promise<void>{


  const supabase =
    await createClient();



  const {
    data:item,
    error
  }
  =
  await supabase
    .from("cart_items")
    .select(
      "quantity"
    )
    .eq(
      "id",
      itemId
    )
    .single();



  if(error || !item){

    throw new Error(
      "Cart item not found"
    );

  }



  await updateCartQuantity(
    itemId,
    item.quantity - 1
  );

}







// =====================================
// REMOVE
// =====================================

export async function removeCartItem(
  itemId:string
):Promise<void>{


  const supabase =
    await createClient();



  const {
    error
  }
  =
  await supabase
    .from("cart_items")
    .delete()
    .eq(
      "id",
      itemId
    );



  if(error){

    throw new Error(
      error.message
    );

  }



  revalidatePath("/cart");

}