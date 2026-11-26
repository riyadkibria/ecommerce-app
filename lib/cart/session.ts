import { cookies } from "next/headers";
import { randomUUID } from "crypto";


const CART_COOKIE = "cart_session";


export async function getCartSession() {


  const cookieStore = await cookies();


  const existing =
    cookieStore.get(CART_COOKIE);



  if(existing){

    return existing.value;

  }



  const newSession =
    randomUUID();



  cookieStore.set(
    CART_COOKIE,
    newSession,
    {
      httpOnly:true,

      secure:
        process.env.NODE_ENV === "production",

      sameSite:"lax",

      maxAge:
        60 * 60 * 24 * 30,

      path:"/"
    }
  );



  return newSession;

}