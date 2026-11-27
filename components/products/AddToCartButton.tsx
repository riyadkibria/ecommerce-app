"use client";


import { useState } from "react";

import { addToCart } from "@/app/actions/cart";



type AddToCartButtonProps = {

  productId:string;

  stock:number;

};





export default function AddToCartButton({

  productId,

  stock

}:AddToCartButtonProps){



  const [status,setStatus] =
    useState<
      "idle" | "loading" | "added"
    >("idle");



  const outOfStock =
    stock <= 0;





  async function handleClick(){


    if(
      outOfStock ||
      status !== "idle"
    ){

      return;

    }



    try{


      setStatus("loading");



      await addToCart(
        productId
      );



      setStatus("added");



      setTimeout(()=>{

        setStatus("idle");

      },1500);



    }
    catch(error){


      console.error(
        "Add to cart error:",
        error
      );


      setStatus("idle");


    }


  }





  return (

    <button

      onClick={handleClick}

      disabled={
        outOfStock ||
        status === "loading"
      }

      className="
        w-full
        rounded-lg
        bg-black
        px-6
        py-3
        font-medium
        text-white
        transition
        hover:bg-gray-800
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:bg-gray-300
      "

    >


      {
        outOfStock &&
        "Out of Stock"
      }



      {
        !outOfStock &&
        status === "idle" &&
        "Add To Cart"
      }




      {
        status === "loading" &&
        "Adding..."
      }




      {
        status === "added" &&
        "✓ Added To Cart"
      }



    </button>

  );

}