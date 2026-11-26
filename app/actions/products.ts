import { createClient } from "@/lib/supabase/server";


export async function getProducts(){


  const supabase = await createClient();


  const { data, error } =
    await supabase
      .from("products")
      .select(`
        id,
        name,
        price,
        thumbnail,
        rating,
        stock
      `)
      .order("created_at", {
        ascending:false
      });



  if(error){

    console.log(
      "Product fetch error:",
      error.message
    );

    return [];

  }



  return data;

}