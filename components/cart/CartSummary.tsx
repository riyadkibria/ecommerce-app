"use client";


type CartSummaryProps = {

  total:number;

};



export default function CartSummary({
  total
}:CartSummaryProps){



  const shipping = 60;



  const grandTotal =
    total + shipping;



  return (

    <div
      className="
        rounded-xl
        border
        p-5
        space-y-4
      "
    >


      <h2
        className="
          text-lg
          font-semibold
        "
      >

        Order Summary

      </h2>




      <div
        className="
          flex
          justify-between
          text-sm
        "
      >

        <span>
          Subtotal
        </span>


        <span>
          ৳ {total}
        </span>


      </div>





      <div
        className="
          flex
          justify-between
          text-sm
        "
      >

        <span>
          Shipping
        </span>


        <span>
          ৳ {shipping}
        </span>


      </div>






      <div
        className="
          border-t
          pt-4
          flex
          justify-between
          font-semibold
        "
      >

        <span>
          Total
        </span>


        <span>
          ৳ {grandTotal}
        </span>


      </div>






      <button

        className="
          w-full
          rounded-lg
          bg-black
          py-3
          text-white
          text-sm
          font-medium
          hover:bg-gray-800
        "

      >

        Checkout

      </button>



    </div>

  );

}