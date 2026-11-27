"use client";


import { useEffect, useState } from "react";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import { getCart } from "@/app/actions/cart";





type CartDrawerProps = {

  open:boolean;

  onClose:()=>void;

};





type CartData = {

  id:string;

  items:any[];

  total:number;

};







export default function CartDrawer({

  open,

  onClose

}:CartDrawerProps){





  const [cart,setCart] =
    useState<CartData | null>(null);




  const [loading,setLoading] =
    useState(false);







  async function loadCart(){


    try{


      setLoading(true);



      const data =
        await getCart();



      setCart(data);



    }

    finally{


      setLoading(false);


    }


  }








  useEffect(()=>{


    if(open){

      loadCart();

    }


  },[open]);









  return (

    <>


      {
        open &&


        <div

          onClick={onClose}

          className="
            fixed
            inset-0
            z-40
            bg-black/30
          "

        />


      }









      <aside

        className={`

          fixed

          right-0

          top-0

          z-50

          h-full

          w-full

          max-w-md

          bg-white

          p-6

          shadow-xl

          transition-transform

          duration-300


          ${
            open

            ?

            "translate-x-0"

            :

            "translate-x-full"

          }

        `}

      >






        <div

          className="
            mb-6
            flex
            justify-between
            items-center
          "

        >



          <h2

            className="
              text-xl
              font-semibold
            "

          >

            Cart

          </h2>





          <button

            onClick={onClose}

            className="
              text-xl
            "

          >

            ✕

          </button>



        </div>









        {
          loading &&

          <p>

            Loading...

          </p>

        }








        {
          !loading &&
          cart?.items.map(

            (item)=>(


              <CartItem

                key={
                  item.id
                }

                item={
                  item
                }


              />


            )

          )
        }









        {
          cart &&


          <CartSummary


            total={

              cart.total

            }


            itemCount={

              cart.items.length

            }


          />


        }







      </aside>




    </>

  );

}