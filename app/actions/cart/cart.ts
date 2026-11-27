"use server";


import { createClient } from "@/lib/supabase/server";
import { getCartSession } from "@/lib/cart/session";



// =====================================
// GET OR CREATE CART
// =====================================

export async function getOrCreateCart() {


  const supabase =
    await createClient();




  const {
    data:{
      user
    }

  } =
  await supabase.auth.getUser();





  // =====================================
  // LOGGED USER CART
  // =====================================


  if(user){


    const {
      data:cart,
      error:fetchError

    } =
    await supabase
      .from("carts")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .eq(
        "status",
        "active"
      )
      .maybeSingle();




    if(fetchError){

      throw new Error(
        fetchError.message
      );

    }




    if(cart){

      return cart;

    }





    const {
      data:newCart,
      error

    } =
    await supabase
      .from("carts")
      .insert({

        user_id:
          user.id,

        status:
          "active"

      })
      .select()
      .single();





    if(error){

      throw new Error(
        error.message
      );

    }




    return newCart;


  }








  // =====================================
  // GUEST CART
  // =====================================


  const sessionId =
    await getCartSession();





  const {
    data:guestCart,
    error:guestFetchError

  } =
  await supabase
    .from("carts")
    .select("*")
    .eq(
      "session_id",
      sessionId
    )
    .eq(
      "status",
      "active"
    )
    .maybeSingle();





  if(guestFetchError){

    throw new Error(
      guestFetchError.message
    );

  }





  if(guestCart){

    return guestCart;

  }








  const {
    data:newGuestCart,
    error

  } =
  await supabase
    .from("carts")
    .insert({

      session_id:
        sessionId,


      status:
        "active"

    })
    .select()
    .single();





  if(error){

    throw new Error(
      error.message
    );

  }




  return newGuestCart;


}









// =====================================
// GET CART WITH PRODUCTS
// =====================================

export async function getCart(){



  const supabase =
    await createClient();




  const cart =
    await getOrCreateCart();







  const {
    data:items,
    error

  } =
  await supabase
    .from("cart_items")
    .select(

      `
      id,
      quantity,
      unit_price,

      product:products(
        id,
        name,
        thumbnail,
        price,
        rating,
        stock
      )
      `

    )
    .eq(
      "cart_id",
      cart.id
    );







  if(error){

    throw new Error(
      error.message
    );

  }







  const formattedItems =
    (items ?? []).map(
      (item:any)=>({

        id:
          item.id,


        quantity:
          item.quantity,


        unit_price:
          Number(
            item.unit_price
          ),


        product:
          item.product


      })
    );








  const total =
    formattedItems.reduce(

      (
        sum,
        item
      )=>{


        return (

          sum +

          (
            item.unit_price *
            item.quantity
          )

        );


      },

      0

    );








  return {


    id:
      cart.id,


    items:
      formattedItems,



    total


  };


}