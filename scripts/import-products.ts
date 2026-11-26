import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});


async function importProducts() {


  console.log("Starting import...");


  console.log(
    "Supabase URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );


  console.log(
    "Service Key:",
    process.env.SUPABASE_SERVICE_ROLE_KEY
      ? "FOUND"
      : "MISSING"
  );


  const { admin } = await import(
    "../lib/supabase/admin"
  );



  const response = await fetch(
    "https://dummyjson.com/products?limit=100"
  );


  const data = await response.json();

  const products = data.products;


  console.log(
    `Found ${products.length} products`
  );



  for (const product of products) {


    console.log(
      "Importing:",
      product.title
    );



    // ==========================
    // CHECK EXISTING PRODUCT
    // ==========================


    const { data: existingProduct } =
      await admin
        .from("products")
        .select("id")
        .eq("external_id", product.id)
        .maybeSingle();



    if(existingProduct){

      console.log(
        "Already exists:",
        product.title
      );

      continue;

    }




    // ==========================
    // CATEGORY
    // ==========================


    let { data: category } =
      await admin
        .from("categories")
        .select("id")
        .eq("name", product.category)
        .maybeSingle();




    if(!category){


      const { data:newCategory,error } =
        await admin
          .from("categories")
          .insert({

            name: product.category

          })
          .select()
          .single();



      if(error){

        console.log(
          "Category error:",
          error.message
        );

        continue;

      }


      category = newCategory;


    }




    if(!category){

      console.log(
        "Category missing:",
        product.category
      );

      continue;

    }





    // ==========================
    // BRAND
    // ==========================


    let brand = null;



    if(product.brand){


      const {data:existingBrand} =
        await admin
          .from("brands")
          .select("id")
          .eq("name", product.brand)
          .maybeSingle();



      brand = existingBrand;




      if(!brand){


        const {data:newBrand,error} =
          await admin
            .from("brands")
            .insert({

              name: product.brand

            })
            .select()
            .single();



        if(error){

          console.log(
            "Brand error:",
            error.message
          );

          continue;

        }


        brand = newBrand;


      }


    }




    // ==========================
    // PRODUCT
    // ==========================


    const {
      data: insertedProduct,
      error:productError

    } = await admin
      .from("products")
      .insert({


        external_id:
          product.id,


        name:
          product.title,


        description:
          product.description,


        price:
          product.price,


        discount_percentage:
          product.discountPercentage,


        rating:
          product.rating,


        stock:
          product.stock,


        sku:
          product.sku,


        availability_status:
          product.availabilityStatus,


        warranty_information:
          product.warrantyInformation,


        shipping_information:
          product.shippingInformation,


        thumbnail:
          product.thumbnail,


        category_id:
          category.id,


        brand_id:
          brand?.id ?? null


      })
      .select()
      .single();





    if(productError || !insertedProduct){


      console.log(

        "Product error:",

        product.title,

        productError?.message

      );


      continue;

    }






    // ==========================
    // PRODUCT IMAGES
    // ==========================


    if(product.images?.length){



      const images =
        product.images.map(
          (image:string)=>({

            product_id:
              insertedProduct.id,


            image_url:
              image

          })

        );




      const {
        error:imageError

      } = await admin
        .from("product_images")
        .insert(images);




      if(imageError){

        console.log(
          "Image error:",
          imageError.message
        );

      }


    }






    // ==========================
    // REVIEWS
    // ==========================


    if(product.reviews?.length){



      const reviews =
        product.reviews.map(
          (review:any)=>({


            product_id:
              insertedProduct.id,


            rating:
              review.rating,


            comment:
              review.comment,


            reviewer_name:
              review.reviewerName,


            reviewer_email:
              review.reviewerEmail,


            review_date:
              review.date


          })

        );




      const {
        error:reviewError

      } = await admin
        .from("reviews")
        .insert(reviews);




      if(reviewError){

        console.log(
          "Review error:",
          reviewError.message
        );

      }


    }






    console.log(
      "Completed:",
      product.title
    );


  }




  console.log(
    "🎉 Import finished successfully"
  );


}





importProducts();