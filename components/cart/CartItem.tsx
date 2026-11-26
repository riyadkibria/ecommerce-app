"use client";


import Image from "next/image";



type CartItemProps = {

  item: {

    id:string;

    quantity:number;

    unit_price:number;

    product:{

      id:string;

      name:string;

      thumbnail:string | null;

      price:number;

    };

  };

};





export default function CartItem({
  item
}:CartItemProps){


  const {
    product
  } = item;



  return (

    <div
      className="
        flex
        gap-4
        border-b
        py-4
      "
    >


      {/* Product Image */}

      <div
        className="
          relative
          h-20
          w-20
          overflow-hidden
          rounded-lg
          bg-gray-100
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

          className="
            object-cover
          "

        />

      </div>





      {/* Product Info */}

      <div
        className="
          flex
          flex-1
          flex-col
          justify-between
        "
      >


        <div>


          <h3
            className="
              text-sm
              font-medium
            "
          >

            {product.name}

          </h3>




          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >

            ৳ {item.unit_price}

          </p>


        </div>





        {/* Bottom */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
          "
        >


          {/* Quantity */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-lg
              border
              px-3
              py-1
            "
          >

            <button>
              -
            </button>


            <span
              className="
                text-sm
              "
            >

              {item.quantity}

            </span>



            <button>
              +
            </button>


          </div>





          <button

            className="
              text-sm
              text-red-500
              hover:text-red-700
            "

          >

            Remove

          </button>


        </div>


      </div>


    </div>

  );


}