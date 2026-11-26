"use client";


import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import type { Product } from "@/types/product";

import { addToCart } from "@/app/actions/cart";



type ProductCardProps = {

  product: Product;

};




export default function ProductCard({
  product,
}: ProductCardProps) {


  const [status, setStatus] =
    useState<
      "idle" | "loading" | "added"
    >("idle");



  const outOfStock =
    product.stock <= 0;



  const lowStock =
    product.stock > 0 &&
    product.stock <= 5;





  async function handleAddToCart() {


    if(
      outOfStock ||
      status !== "idle"
    ){

      return;

    }



    try {


      setStatus("loading");



      await addToCart(
        product.id
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

    <article

      className="
        overflow-hidden
        rounded-xl
        border
        border-stone-200
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        dark:border-stone-800
        dark:bg-stone-900
      "

    >



      <Link

        href={`/products/${product.id}`}

        className="block"

      >


        <div className="group">


          <div

            className="
              relative
              aspect-square
              overflow-hidden
              bg-stone-100
              dark:bg-stone-800
            "

          >


            <Image

              src={
                product.thumbnail ??
                "/images/placeholder.png"
              }

              alt={
                product.name
              }

              fill

              sizes="300px"

              className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "

            />


          </div>





          <div

            className="
              space-y-2
              p-3
            "

          >



            <h2

              className="
                line-clamp-2
                min-h-[40px]
                text-sm
                font-semibold
                text-stone-900
                dark:text-white
              "

            >

              {product.name}


            </h2>







            <div

              className="
                flex
                items-center
                justify-between
              "

            >



              <p

                className="
                  text-lg
                  font-bold
                  tracking-tight
                "

              >

                ${product.price}

              </p>




              <span

                className="
                  flex
                  items-center
                  gap-1
                  text-xs
                  text-amber-500
                "

              >

                ★ {product.rating}

              </span>



            </div>







            <div

              className="
                flex
                items-center
                justify-between
                text-xs
              "

            >



              <span

                className={`font-medium ${
                  outOfStock
                    ? "text-red-500"
                    : lowStock
                    ? "text-amber-600"
                    : "text-green-600"
                }`}

              >

                {
                  outOfStock
                  ?
                  "Out of stock"
                  :
                  `${product.stock} left`
                }


              </span>



            </div>




          </div>



        </div>



      </Link>







      <div

        className="
          px-3
          pb-3
        "

      >



        <button

          type="button"

          onClick={
            handleAddToCart
          }

          disabled={
            outOfStock ||
            status === "loading"
          }

          className="
            h-10
            w-full
            rounded-lg
            bg-stone-900
            text-sm
            font-medium
            text-white
            transition
            hover:bg-stone-800
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:bg-stone-300
            dark:bg-white
            dark:text-black
            dark:hover:bg-stone-200
          "

        >



          {
            outOfStock &&
            "Out of Stock"
          }




          {
            !outOfStock &&
            status === "idle" &&
            "Add to Cart"
          }




          {
            status === "loading" &&
            "Adding..."
          }




          {
            status === "added" &&
            "✓ Added"
          }



        </button>




      </div>




    </article>

  );

}