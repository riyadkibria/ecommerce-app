"use client";


import { useState } from "react";

import CartDrawer from "./CartDrawer";



export default function CartButton(){


  const [open,setOpen] =
    useState(false);



  return (

    <>

      <button

        onClick={() =>
          setOpen(true)
        }

        className="
          rounded-lg
          p-2
          hover:bg-gray-100
        "

      >

        🛒

      </button>





      <CartDrawer

        open={open}

        onClose={() =>
          setOpen(false)
        }

      />


    </>

  );

}